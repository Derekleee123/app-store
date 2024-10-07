"use client";
// import Image from "next/image";

export default function HorizontalCard({
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
      <div className="flex flex-col items-center justify-center w-[300px]">
        <img
          className="rounded-[20px]"
          src={image}
          alt={title}
          width={100}
          height={100}
        />
        <h2 className="font-bold mt-[10px]">{title}</h2>
        <div className="text-xl font-bold">{description}</div>
      </div>
    </>
  );
}
