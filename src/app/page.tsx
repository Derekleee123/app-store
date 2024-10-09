"use client";
import axios from "axios";
import { useEffect, useState } from "react";
// import AppVerticalCard from "./components/AppVerticalCard";
import AppHorizontalCard from "./components/AppHorizontalCard";
import { Input, Table, Skeleton } from "antd";

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
        className="rounded-[50%] border-[1px] border-[#e6e6e6]"
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
    render: (title: string) => (
      <div className="text-[16px] font-bold md:text-[20px] lg:text-[24px]">
        {title}
      </div>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category: string) => (
      <div className="text-[12px] text-[#8c8c8c] md:text-[14px] lg:text-[16px]">
        {category}
      </div>
    ),
  },
];

export default function Home() {
  const [apps, setApps] = useState([]);
  const [hotApps, setHotApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      const hotAppData = await getHotApps();

      setApps(appData.feed.entry);
      setHotApps(hotAppData.feed.entry);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (apps.length > 0 && hotApps.length > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [apps, hotApps]);

  return (
    <>
      <div className="container mx-auto flex w-full flex-col items-center bg-transparent px-4">
        <Input.Search
          className="mt-[20px] rounded-[10px] bg-[#f7f7f7] p-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
          size="large"
          placeholder="Search"
        />
        <h1 className="mt-[20px] text-[18px] font-bold md:text-[30px] lg:text-[40px]">
          Top Free
        </h1>

        <div className="container mx-auto flex w-full flex-col items-center bg-transparent">
          {isLoading ? (
            <div className="mt-[20px] flex h-[200px] w-[300px] items-center justify-center gap-1 overflow-x-scroll rounded-[10px] border-[1.5px] border-[#fff] bg-[rgba(255,255,255,0.2)] p-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] sm:w-[700px] md:w-[900px]">
              <Skeleton active />
            </div>
          ) : (
            <div className="mt-[20px] flex w-full items-center gap-3 overflow-x-scroll rounded-[10px] border-[1.5px] border-[#fff] bg-[rgba(255,255,255,0.2)] py-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] sm:gap-1">
              {hotApps.map((app: App) => (
                <AppHorizontalCard
                  key={app["im:name"].label}
                  title={app["im:name"].label}
                  description={app["category"].attributes.label}
                  image={app["im:image"][2].label}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <main className="container mx-auto mb-[60px] flex min-h-screen flex-col items-center justify-between px-4">
        <h1 className="my-[20px] text-[18px] font-bold md:text-[30px] lg:text-[40px]">
          App Store
        </h1>
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
          {isLoading ? (
            <div className="flex w-full flex-wrap items-center justify-center gap-4 rounded-[10px] border-[1px] border-[#fff] px-[10px] py-[30px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </div>
          ) : (
            <Table
              onRow={() => ({
                style: { backgroundColor: "transparent" },
              })}
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                borderColor: "#fff",
                borderWidth: "1px",
              }}
              className="w-full rounded-[10px] p-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
              columns={columns.map((col) => ({
                ...col,
                title: <span className="text-xl text-white">{col.title}</span>,
              }))}
              dataSource={apps.map((app: App) => ({
                key: app["im:name"].label,
                title: app["im:name"].label,
                category: app["category"].attributes.label,
                image: app["im:image"][2].label,
              }))}
              pagination={{
                pageSize: 10,
              }}
            />
          )}
        </div>
      </main>
    </>
  );
}
