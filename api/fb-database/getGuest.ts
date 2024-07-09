import { db } from "../../firebase.config.js";
import { collection, getDocs } from "firebase/firestore";


export const getGuest = async () => {

    const querySnapshot = await getDocs(collection(db, "guests"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });

}