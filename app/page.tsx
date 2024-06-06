import Image from "next/image";
import { getDatabase, ref, onValue } from "firebase/database";
import { getGuest } from "@/api/getGuest";
import { createGuest } from "@/api/setGuest";

export default function Home() {
  //createGuest()
  const guest = getGuest()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={"text-3xl"}>
        Wedding App - Home Page
      </h1>
    </main>
  );
}
