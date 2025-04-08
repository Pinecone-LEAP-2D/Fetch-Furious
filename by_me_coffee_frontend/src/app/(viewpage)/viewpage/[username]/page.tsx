"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { username } = useParams();
  useEffect(() => {
    console.log(username);
  }, []);

  return (
    <div className="w-scree items-center flex flex-col">
      <div className="w-full h-[500px]">
        <Image
          width={20}
          height={20}
          alt="backgroundImage"
          className="w-full h-full"
          src={"/next.svg"}
        />
      </div>
      <div className="flex gap-6 w-[90%]">
        <div className="flex flex-col gap-5 w-full">
          <div className="p-6 border rounded-lg">
            <div className="w-full flex justify-between">
                <div className="flex gap-3 items-center">
                    <div className="border w-12 h-12 rounded-full"></div>
                    <div className="text-xl font-semibold">{username}</div>
                </div>
            </div>
          </div>
          <div className="p-6 border rounded-lg"></div>
          <div className="p-6 border rounded-lg"></div>
        </div>
        <div className="flex flex-col gap-5 w-full border rounded-lg">
          <div className="p-6"></div>
          <div className="p-6"></div>
          <div className="p-6"></div>
        </div>
      </div>
    </div>
  );
}
