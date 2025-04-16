/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mainPageData } from "@/lib/localFile";
import { BookHeart, CalendarDays, CircleCheck, FileLock, Globe, Heart, Instagram, Mail, Search, Star, Twitter, Youtube } from "lucide-react";
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
        <div className="w-290">
        <div className="mb-20 flex items-center flex-col">
          <h2 className="mt-32 text-center text-dark w-3/4 font-bold text-6xl text-64"> Designed for creators, 
            <p className="text-gray-500">not for businesses.</p>
          </h2>
          <div className="mt-30 grid grid-cols-2 flex-wrap gap-x-20 w-4/5 gap-y-20  ">
            <div className="flex">
              <CircleCheck width={100} height={100}/>
              <h3 className="text-24 font-semibold text-2xl text-gray-400">We dont call them customers or transactions. They are your
              <span className="text-dark  font-semibold text-2xl"> supporters.</span>
              </h3>
            </div>
            <div className="flex">
              <CircleCheck width={100} height={100}/>
              <h3 className="text-24 text-center  font-semibold text-2xl text-gray-400">You have <p>100% ownership</p> of your supporters. We never email them, and you can export the list any time you like.</h3>
            </div>
            <div className="flex">
              <CircleCheck width={100} height={100}/>
              <h3 className="text-24 font-semibold text-2xl text-gray-400">We dont call them customers or transactions. They are your
              <span className="text-dark  font-semibold text-2xl"> supporters.</span>
              </h3>
            </div>
            <div className="flex">
              <CircleCheck width={100} height={100}/>
              <h3 className="text-24 font-semibold text-2xl text-gray-400">We dont call them customers or transactions. They are your
              <span className="text-dark  font-semibold text-2xl"> supporters.</span>
              </h3>
            </div>
          </div>
        </div>
        </div>
        <div className="bg-white rounded-[48px] w-290 text-center pt-10 pb-10 px-10 ">
          <h2 className="animated-content mt-24 text-dark font-bold text-6xl"> Make 20% or more, 
            <p className="text-gray-500 font-bold text-6xl">compared to other platforms.</p>
          </h2>
          <div className="grid grid-cols-3 gap-y-30 gap-x-30 mt-20">
            <div className="text-left">
              <CalendarDays width={46} height={50}/>
              <h3 className="text-dark text-20 font-bold text-xl mt-1 mb-4">Not just a membership</h3>
              <h4 className="text-gray-400 text-20 font-bold text-xl">Creators who previously only used Patreon noticed a massive increase in earnings after accepting one-off payments.</h4>
            </div>
            <div className="text-left">
              <Globe width={46} height={50}/> 
              <h3 className="text-dark text-20 font-bold text-xl mt-1 mb-4">6 new languages</h3>
              <h4 className="text-gray-400 text-20 font-bold text-xl">We now support Spanish, French, Italian, German and Ukrainian—making it easier for your global audience to support you.</h4>
            </div>
            <div className="text-left">
              <Mail width={46} height={50}/>
              <h3 className="text-dark text-20 font-bold text-xl mt-1 mb-4">Email marketing</h3>
              <h4 className="text-gray-400 text-20 font-bold text-xl">Instead of paying separately for email marketing tools like Mailchimp, send unlimited emails to your fans for free.</h4>
            </div>
            <div className="text-left">
            <BookHeart width={46} height={50}/>
              <h3 className="text-dark text-20 font-bold text-xl mt-1 mb-4">Being friendly converts</h3>
              <h4 className="text-gray-400 text-20 font-bold text-xl">ICYMI, we make it simple and fun for your supporters. While you cannot put a number on feelings, it tends to show on the results.</h4>
            </div>
            <div className="text-left">
            <FileLock width={46} height={50}/>
              <h3 className="text-dark text-20 font-bold text-xl mt-1 mb-4">Your privacy comes first</h3>
              <h4 className="text-gray-400 text-20 font-bold text-xl">Receive fan support safely without disclosing your identity or address. We’ll do the heavy-lifting.</h4>
            </div>
          </div>
        </div>
        <div className="pb-10 mt-10">
          <div className="flex w-290">
            <div className="text-16 flex items-center mr-16 font-semibold text-sm text-gray-500"> © Buy Me a Coffee </div>
            <div className="flex w-full justify-center">
              <p className="text-dark font-bold mr-15 flex items-center text-sm ">About</p>
              <p className="text-dark font-bold mr-15 flex items-center text-sm">Help center</p>
              <p className="text-dark font-bold mr-15 flex items-center text-sm">Apps</p>
              <p className="text-dark font-bold mr-15 flex items-center text-sm">Resources</p>
              <p className="text-dark font-bold mr-15 flex items-center text-sm">Privacy</p>
              <p className="text-dark font-bold mr-15 flex items-center text-sm">Terms</p>
            </div>
            <div className="flex flex-wrap-reverse ">
              <div className="flex justify-center gap-6">
              <Twitter width={35} height={35}/>
              <Youtube width={35} height={35}/>
              <Instagram width={35} height={35}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
