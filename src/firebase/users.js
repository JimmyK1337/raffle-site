import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Creates a user document in Firestore
 * @param {Object} user - The user object from Firebase Auth
 * @param {Object} additionalData - Any additional data to store
 */
export const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const { email, displayName } = user;

    try {
        await setDoc(
            userRef,
            {
                uid: user.uid,
                email,
                displayName,
                createdAt: serverTimestamp(),
                role: "user", // Default role
                ...additionalData,
            },
            { merge: true }
        );
    } catch (error) {
        console.error("Error creating user document", error);
        throw error;
    }
};
