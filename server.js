import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import admin from "firebase-admin";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Express middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.raw({ type: "application/json" }));

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
// Replace escaped newlines with actual newlines
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Create Stripe checkout session
app.post("/create-checkout-session", async (req, res) => {
  const { cart, uid } = req.body;

  if (!cart || !uid) {
    return res.status(400).json({ error: "Cart and UID are required" });
  }

  try {
    const line_items = cart.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: { uid },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Stripe webhook
app.post("/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const uid = session.metadata.uid;

    try {
      const purchaseRef = db.collection("users").doc(uid).collection("purchases");

      // Use line_items if available
      const items = session.line_items || [];
      const purchasedItems = items.map((i) => ({
        title: i.description || i.price.product.name,
        quantity: i.quantity,
        amount_total: i.amount_total / 100,
        purchased_at: admin.firestore.FieldValue.serverTimestamp(),
      }));

      for (const item of purchasedItems) {
        await purchaseRef.add(item);
      }

      console.log(`Saved purchase for user ${uid}`);
    } catch (err) {
      console.error("Error saving purchase to Firestore:", err);
    }
  }

  res.json({ received: true });
});

// Start server
const PORT = 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
