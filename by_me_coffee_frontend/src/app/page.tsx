import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex items-center flex-col text-center">
      <div className="flex items-center gap-4 mb-20 mt-[150px]">
        <Star fill="#2E813A" stroke="#2E813A"/>
        <Star fill="#2E813A" stroke="#2E813A"/>
        <Star fill="#2E813A" stroke="#2E813A"/>
        <Star fill="#2E813A" stroke="#2E813A"/>
        <Star fill="#2E813A" stroke="#2E813A"/>
        <h4 className="text-dark text-18 ml-4 font-semibold text-lg">Loved by 1,000,000+ creators</h4>
      </div>
      <h1 className="text-dark text-96 text-center font-bold text-7xl"> Fund your creative work </h1>
      <p className="mb-16 text-22 text-center text-dark mt-8 w-600 font-medium text-lg"> Accept support. Start a membership. Setup a shop. It’s easier than you think.</p>
      <Button className="rounded-full flex items-center justify-center h-24 text-24 px-20 mt-1 cursor-pointer bg-yellow-300">
        <h2 className="z-10 text-black font-semibold text-xl">Start my page</h2>
      </Button>
      <h4 className="text-dark mt-5 w-600 text-center font-normal text-lg"> It’s free and takes less than a minute! </h4>
      <div className="mt-20 flex flex-col"></div>
    </div>
  );
}
