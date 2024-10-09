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
      <div className="mx-1 flex h-[120px] w-[80px] flex-col items-center pt-0 sm:h-[200px] sm:w-[150px] sm:pt-4 md:h-[250px] md:w-[200px]">
        <img
          className="h-[80px] w-[80px] rounded-[10px] border-[1px] border-[#e6e6e6] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] md:rounded-[20px] xl:h-[150px] xl:w-[150px]"
          src={image}
          alt={title}
        />
        <div className="mt-[10px] flex w-[100px] flex-grow items-center justify-center text-center text-[12px] font-bold sm:w-[150px] sm:text-[14px] md:w-[200px] md:text-[16px]">
          {title}
        </div>
        <div className="mt-[10px] hidden w-[200px] flex-grow truncate text-center text-[10px] text-[#8c8c8c] sm:block sm:text-[12px] md:text-[14px]">
          {description}
        </div>
      </div>
    </>
  );
}
