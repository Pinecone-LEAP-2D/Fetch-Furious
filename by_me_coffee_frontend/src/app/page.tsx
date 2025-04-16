/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mainPageData } from "@/lib/localFile";
import { Heart, Search, Star } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScolled] = useState(false);
  const lastScrollY = useRef(0);
  console.log();
  console.log(window.scrollY);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full flex items-center relative flex-col text-center ${
        scrolled ? " bg-[#faf8f0]" : "bg-white"
      }`}
    >
      <div
        className={`w-screen px-6 py-4 flex sticky top-0 justify-between bg-white transition-transform duration-500 z-50 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } ${scrolled ? "bg-white shadow-md backdrop-blur-sm" : ""}`}
      >
        <div className="absoute w-full absolute flex justify-center -z-10"> <img src="logo.png" className="h-12"/></div>
        <div className="flex gap-4">
          <Button variant="ghost" className="rounded-2xl">FAQ</Button>
          <Button variant="ghost" className="rounded-2xl">
            Wall of us <Heart />
          </Button>
        </div>
        <div className="flex gap-6">
          <div className="w-[250px] flex h-full relative items-center">
            <Search className="absolute left-4" size={18}/>
            <Input className=" pl-10 h-full w-full rounded-[30px] font-semibold bg-black/3 hover:bg-black/8" placeholder="Search a creators"/>
          </div>
          <Button className="py-6 text-lg font-semibold rounded-3xl cursor-pointer" variant='ghost'>Sign in</Button>
          <Button className="py-6 text-lg font-semibold rounded-3xl cursor-pointer hover:bg-yellow-300 bg-yellow-300 text-black" >Sign up</Button>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-10 mt-[130px]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} fill="#2E813A" stroke="#2E813A" />
        ))}
        <h4 className="text-dark text-18 ml-4 font-semibold text-lg">
          Loved by 1,000,000+ creators
        </h4>
      </div>

      <h1 className="text-dark w-[700px] text-center font-bold text-[96px] text-sm/25">
        Fund your creative work
      </h1>

      <p className="mb-16 text-22 text-center text-dark mt-8 font-medium text-lg">
        Accept support. Start a membership. Setup a shop. It&apos;s easier than
        you think.
      </p>

      <Button className="rounded-full flex items-center justify-center h-24 text-24 px-20 mt-1 cursor-pointer bg-yellow-300">
        <h2 className="z-10 text-black font-semibold text-3xl">
          Start my page
        </h2>
      </Button>

      <h4 className="text-dark mt-5 w-600 text-center font-normal text-lg">
        It&apos;s free and takes less than a minute!
      </h4>

      {/* Sections */}
      <div className="mt-24 flex flex-col max-w-[1140px] w-full gap-6">
        {mainPageData.map((data, i) => (
          <div
            key={i}
            className="bg-[#FFFFFF] w-full rounded-[24px] p-12 flex flex-col items-center gap-6"
          >
            <div className="text-[#717171] font-semibold text-lg">
              {data.head}
            </div>
            <div className="text-[64px] font-bold w-[859px] text-center text-sm/20">
              <div>{data.title}</div>
              <div>{data.title1}</div>
            </div>
            <div className="text-[24px] text-center">{data.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
