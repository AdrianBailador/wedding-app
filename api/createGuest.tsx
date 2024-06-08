import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase.config";

// Define the interface for newGuest
interface Guest {
  name: string;
  surname: string;
  email: string;
  assistance: boolean;
  accompanist: boolean;
  photos: any[];
  token: string;
  comment: string;
}

export const createGuest = async (newGuest: Guest): Promise<string | undefined> => {
  try {
    console.log("Creating guest in Firestore with data:", newGuest);
    const docRef = await addDoc(collection(db, "guests"), newGuest);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the ID of the created document
  } catch (error) {
    console.error("Error adding document to Firestore:", error);
    throw error;
  }
};
