"use client";
import React from "react";

export default function AppHorizontalCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <>
      <div className="flex h-[160px] w-[100px] flex-col items-center rounded-[10px] border-[1.5px] border-[#ffffff] p-[10px] pt-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] sm:h-[220px] sm:w-[150px] sm:pt-4 md:h-[280px] md:w-[200px] md:pt-4">
        <img
          className="h-[80px] w-[80px] rounded-[10px] border-[1px] border-[#e6e6e6] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] md:rounded-[20px] xl:h-[150px] xl:w-[150px]"
          src={image}
          alt={title}
        />
        <div className="mt-2 line-clamp-2 w-[80px] flex-grow pt-2 text-center text-[12px] font-bold sm:w-[150px] sm:flex-grow-0 sm:text-[14px] md:mt-[10px] md:w-[180px] md:text-[16px]">
          {title}
        </div>
        <div className="mt-[10px] hidden flex-grow truncate text-center text-[10px] text-[#8c8c8c] sm:block sm:text-[12px] md:w-[200px] md:text-[14px]">
          {description}
        </div>
      </div>
    </>
  );
}
