"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import HorizontalCard from "./components/HorizontalCard";

interface App {
  "im:name": { label: string };
  "im:price": { label: string };
  "im:image": { label: string }[];
  link: { label: string };
}

export default function Home() {
  const [apps, setApps] = useState([]);

  const getApps = async () => {
    {
      try {
        const response = await axios.get(
          "https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json"
        );

        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const appOriginalData = await getApps();
      setApps(appOriginalData.feed.entry);

      console.log(appOriginalData.feed.entry);
    };

    fetchData();
  }, []);

  return (
    <>
      <header className="flex items-center justify-center h-[100px]">
        <h1 className="text-3xl font-bold">App Store</h1>
      </header>
      <main className="flex min-h-screen items-center justify-between p-24">
        <div className="flex items-center justify-center gap-4 w-full flex-wrap">
          {apps.map((app: App) => (
            <HorizontalCard
              key={app["im:name"].label}
              title={app["im:name"].label}
              description={app["im:price"].label}
              image={app["im:image"][2].label}
            />
          ))}
        </div>
      </main>
    </>
  );
}
