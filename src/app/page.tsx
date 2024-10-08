"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import AppVerticalCard from "./components/AppVerticalCard";
import AppHorizontalCard from "./components/AppHorizontalCard";
import { Input, Table } from "antd";

interface App {
  "im:name": { label: string };
  category: {
    attributes: {
      label: string;
    };
  };
  "im:image": { label: string }[];
  link: { label: string };
}

const columns = [
  {
    title: "Logo",
    dataIndex: "image",
    key: "image",
    render: (image: string) => (
      <img
        className="rounded-[20px] border-[1px] border-[#e6e6e6]"
        src={image}
        alt="image"
        width={100}
        height={100}
      />
    ),
  },
  {
    title: "App",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
];

export default function Home() {
  const [apps, setApps] = useState([]);
  const [hotApps, setHotApps] = useState([]);

  const getApps = async () => {
    {
      try {
        const response = await axios.get(
          "https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json",
        );

        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getHotApps = async () => {
    {
      try {
        const response = await axios.get(
          "https://itunes.apple.com/tw/rss/topgrossingapplications/limit=10/json",
        );

        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const appData = await getApps();
      setApps(appData.feed.entry);

      const hotAppData = await getHotApps();
      setHotApps(hotAppData.feed.entry);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <Input.Search
          className="mt-[20px] w-[900px] rounded-[10px] bg-[#f7f7f7] p-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
          placeholder="Search"
        />
        <h1 className="mt-[20px] text-[40px] font-bold">Top Free</h1>
        <div className="mt-[20px] flex w-[900px] items-center gap-1 overflow-x-scroll rounded-[10px] bg-[#f7f7f7] p-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
          {hotApps.map((app: App) => (
            <AppHorizontalCard
              key={app["im:name"].label}
              title={app["im:name"].label}
              description={app["category"].attributes.label}
              image={app["im:image"][2].label}
            />
          ))}
        </div>
      </div>

      <main className="flex min-h-screen flex-col items-center justify-between px-24">
        <h1 className="my-[20px] text-[40px] font-bold">App Store</h1>
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          {/* {apps.map((app: App) => (
            <AppVerticalCard
              key={app["im:name"].label}
              title={app["im:name"].label}
              description={app["category"].attributes.label}
              image={app["im:image"][2].label}
            />
          ))} */}

          <Table
            className="w-[900px] rounded-[10px] bg-[#f7f7f7] p-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
            columns={columns.map((col) => ({
              ...col,
              title: <span className="text-xl">{col.title}</span>,
            }))}
            dataSource={apps.map((app: App) => ({
              key: app["im:name"].label,
              title: app["im:name"].label,
              category: app["category"].attributes.label,
              image: app["im:image"][2].label,
            }))}
            pagination={false}
          />
        </div>
      </main>
    </>
  );
}
