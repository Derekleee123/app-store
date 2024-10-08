"use client";
// import Image from "next/image";

export default function AppVerticalCard({
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
      <div className="flex w-[300px] flex-col items-center justify-center">
        <img
          className="rounded-[20px] border-[1px] border-[#e6e6e6] shadow-2xl"
          src={image}
          alt={title}
          width={100}
          height={100}
        />
        <h2 className="mt-[10px] font-bold">{title}</h2>
        <div className="mt-[10px] line-clamp-2 text-xl font-bold">
          {description}
        </div>
      </div>
    </>
  );
}
