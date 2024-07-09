'use server'

import {collection, addDoc} from "firebase/firestore";
import {db} from "@/firebase.config";

// Define the interface for newGuest
interface Guest {
    name: string;
    //surname: string;
    //email: string;
    //assistance: boolean;
    //accompanist: boolean;
    //token: string;
}

// Create a new guest in the Firestore database
export const createGuest = async (newGuest: Guest) => {
    // get a reference to the guests collection
    const collectionRef = collection(db, "guests");
    // add a new document with the newGuest data
    const docRef = await addDoc(collectionRef, newGuest);
    // return the ID of the new document
    return docRef.id;
}
