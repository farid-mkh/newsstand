import Image from "next/image";
import HomeNews from "./components/HomeNews";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between pt-32 pb-12 px-24">
            <HomeNews />
        </main>
    );
}
