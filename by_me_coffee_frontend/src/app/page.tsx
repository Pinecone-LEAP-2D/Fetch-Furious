import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex items-center bg-[#faf8f0] relative flex-col text-center">
      <div className="flex items-center gap-4 mb-20 mt-[150px]">
        <Star fill="#2E813A" stroke="#2E813A" />
        <Star fill="#2E813A" stroke="#2E813A" />
        <Star fill="#2E813A" stroke="#2E813A" />
        <Star fill="#2E813A" stroke="#2E813A" />
        <Star fill="#2E813A" stroke="#2E813A" />
        <h4 className="text-dark text-18 ml-4 font-semibold text-lg">
          Loved by 1,000,000+ creators
        </h4>
      </div>
      <h1 className="text-dark w-[700px] text-center font-bold text-[96px] line-0 text-sm/25">
        {" "}
        Fund your creative work{" "}
      </h1>
      <p className="mb-16 text-22 text-center text-dark mt-8 font-medium text-lg">
        {" "}
        Accept support. Start a membership. Setup a shop. It&apos;s easier than
        you think.
      </p>
      <Button className="rounded-full flex items-center justify-center h-24 text-24 px-20 mt-1 cursor-pointer bg-yellow-300">
        <h2 className="z-10 text-black font-semibold text-3xl">
          Start my page
        </h2>
      </Button>
      <h4 className="text-dark mt-5 w-600 text-center font-normal text-lg">
        {" "}
        It&apos;s free and takes less than a minute!{" "}
      </h4>
      <div className="mt-24 flex flex-col max-w-[1140px] w-full gap-6">
        <div className="bg-[#FFFFFF] w-full rounded-[24px] p-12 flex flex-col items-center gap-6">
          <div className="text-[#717171] font-semibold text-lg">SUPPORT</div>
          <div className="text-[64px] font-bold w-[859px] text-center text-sm/20">
            <div> Give your audience</div>
            <div>an easy way to say thanks.</div>
          </div>
          <div className="text-[24px]">Buy Me a Coffee makes supporting fun and easy. In just a couple of taps, your fans can make the payment (buy you a coffee) and leave a message.</div>
        </div>
      </div>
    </div>
  );
}
