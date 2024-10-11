"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input, Skeleton } from "antd";
import AppHorizontalCard from "./components/AppHorizontalCard";
import AppListTable from "./components/AppListTable";
import { debounce } from "./utils/debounce";
import { useAppStore } from "./store/useAppStore";
import type { inputSizeCategories, App } from "./store/useAppStore";

export default function Home() {
  const {
    appList,
    originalAppList,
    hotApps,
    isLoading,
    setAppList,
    setOriginalAppList,
    setHotApps,
    setIsLoading,
  } = useAppStore();

  const [isSticky, setIsSticky] = useState(false);
  const [inputSize, setInputSize] = useState<inputSizeCategories>("small");

  const getApps = async () => {
    {
      try {
        const response = await axios.get(
          "https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json",
        );

        if (response.data) {
          setAppList(response.data.feed.entry);
          setOriginalAppList(response.data.feed.entry);
        }
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

        if (response.data) {
          setHotApps(response.data.feed.entry);
          setOriginalAppList(response.data.feed.entry);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleOnSearch = (value: string) => {
    // i. feed.entry[].im:name
    // ii. feed.entry[].summary.label
    // iii. feed.entry[].title.label
    setIsLoading(true);

    if (value) {
      const filteredApps = originalAppList.filter((app: App) => {
        const name = app["im:name"]?.label.toLowerCase();
        const summary = app?.summary?.label.toLowerCase();
        const title = app?.title?.label.toLowerCase();

        return (
          name.includes(value.toLowerCase()) ||
          summary.includes(value.toLowerCase()) ||
          title.includes(value.toLowerCase())
        );
      });

      setAppList(filteredApps);

      if (window.innerWidth > 1024) {
        window.scrollTo({ top: 400, behavior: "smooth" });
      } else if (window.innerWidth > 768) {
        window.scrollTo({ top: 300, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 230, behavior: "smooth" });
      }
    } else {
      getApps();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleResize = (): void => {
    if (window.innerWidth > 1024) {
      setInputSize("large");
    } else if (window.innerWidth > 768) {
      setInputSize("middle");
    } else {
      setInputSize("small");
    }
  };

  const handleScroll = (): void => {
    if (window.scrollY > 50) {
      // 滾動超過 100px 時固定搜尋框
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleResize();
    getApps();
    getHotApps();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header
        className={`container left-1/2 top-0 z-50 translate-x-[-50%] ${
          isSticky ? "fixed" : "relative"
        } z-20 flex w-full items-center bg-transparent px-4 transition-all duration-300`}
      >
        <Input
          className={`${isSticky ? "mt-[10px] bg-[rgba(255,255,255,0.5)]" : "mt-[20px]"} w-full rounded-[10px] bg-[#F7F7F7] p-[10px] px-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]`}
          size={inputSize as inputSizeCategories}
          placeholder="Search"
          onChange={debounce((...args: unknown[]) => {
            const e = args[0] as React.ChangeEvent<HTMLInputElement>;
            handleOnSearch(e.target.value);
          }, 500)}
        />
      </header>
      <div className="container mx-auto flex w-full flex-col items-center bg-transparent px-4">
        <h1 className="mt-[20px] text-[18px] font-bold md:text-[30px] lg:text-[40px]">
          Top Free
        </h1>

        <div className="container mx-auto flex w-full flex-col items-center bg-transparent">
          {isLoading ? (
            <div className="mt-[20px] flex h-[273px] w-full items-center justify-center gap-1 overflow-x-scroll rounded-[10px] border-[1.5px] border-[#fff] bg-[rgba(255,255,255,0.2)] p-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
              <Skeleton active />
            </div>
          ) : (
            <div className="mt-[20px] flex w-full items-center gap-2 overflow-x-scroll rounded-[10px] border-[1.5px] border-[#ffffff] p-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] sm:gap-2 md:gap-3">
              {hotApps.length &&
                hotApps.map((app: App) => (
                  <AppHorizontalCard
                    key={app["im:name"]?.label}
                    title={app["im:name"]?.label}
                    description={app["category"]?.attributes?.label}
                    image={app["im:image"][2]?.label}
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      <main className="container mx-auto mb-[60px] flex flex-col items-center px-4">
        <h1 className="my-[20px] text-[18px] font-bold md:text-[30px] lg:text-[40px]">
          App Store
        </h1>
        <h3 className="mb-[20px] text-[14px] text-[#fff] md:text-[20px] lg:text-[24px]">
          共 {appList.length} 項
        </h3>
        <AppListTable />
      </main>
    </>
  );
}
