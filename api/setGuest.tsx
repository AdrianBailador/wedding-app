import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase.config"

// Add a new document with a generated id.
export  const createGuest = async () => {
    const docRef = await addDoc(collection(db, "guests"), {
        name: "Adrian",
        surname: "Bailador",
        email: "prr@gmail.com",
        photos: [],
        token: "",
        assistance: false,
        accompanist: false,
        comment: ""
      });
}