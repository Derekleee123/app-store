import React, { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import { Skeleton, Table } from "antd";
import type { App } from "../store/useAppStore";

const columns = [
  {
    title: "Logo",
    dataIndex: "image",
    key: "image",
    render: (image: string) => (
      <img
        className="rounded-[50%] border-[1px] border-[#E6E6E6]"
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
      <div className="text-[12px] text-[#8C8C8C] md:text-[14px] lg:text-[16px]">
        {category}
      </div>
    ),
  },
];

function AppListTable() {
  const { appList, isLoading, isChangePage, setIsChangePage } = useAppStore();

  useEffect(() => {
    if (isChangePage) {
      if (window.innerWidth > 1024) {
        window.scrollTo({ top: 400, behavior: "smooth" });
      } else if (window.innerWidth > 768) {
        window.scrollTo({ top: 350, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 230, behavior: "smooth" });
      }
    }
  }, [isChangePage]);

  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
      {isLoading ? (
        <div className="flex h-[100vh] w-full flex-wrap items-center justify-center gap-4 rounded-[10px] border-[1.5px] border-[#fff] px-[10px] py-[30px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
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
          className={`${isChangePage ? "opacity-50" : "opacity-100"} w-full rounded-[10px] p-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] transition-all duration-300`}
          columns={columns.map((col) => ({
            ...col,
            title: (
              <span className="text-[12px] text-white sm:text-[16px] md:text-[20px] lg:text-[24px]">
                {col.title}
              </span>
            ),
          }))}
          dataSource={appList.map((app: App) => ({
            key: app["im:name"].label,
            title: app["im:name"].label,
            category: app["category"].attributes.label,
            image: app["im:image"][2].label,
          }))}
          pagination={{
            defaultCurrent: 1,
            pageSize: 10,
            showSizeChanger: false,
            onChange: () => {
              setIsChangePage(true);
              setTimeout(() => {
                setIsChangePage(false);
              }, 500);
            },
          }}
        />
      )}
    </div>
  );
}

export default AppListTable;
