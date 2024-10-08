"use client";
// import Image from "next/image";

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
      <div className="mx-1 flex h-[250px] w-[200px] flex-col items-center pt-[20px]">
        <img
          className="rounded-[20px] border-[1px] border-[#e6e6e6]"
          src={image}
          alt={title}
          width={120}
          height={120}
        />
        <div className="mt-[10px] flex w-[200px] items-center justify-center text-center font-bold">
          {title}
        </div>
        <div className="mt-[10px] w-[200px] truncate text-center text-[14px] text-[#a0a0a0]">
          {description}
        </div>
      </div>
    </>
  );
}
