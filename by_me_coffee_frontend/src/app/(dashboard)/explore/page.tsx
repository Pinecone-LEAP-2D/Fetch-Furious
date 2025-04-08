'use client'

import { Input } from "@/components/ui/input";
import { getManyProfile } from "@/utils/request";
import { Profile } from "@prisma/client";
import { useEffect, useState } from "react";

const Explore = () => {
    const [profiles, setProfiles] = useState<Profile[]>([])
    const profileExplore = async () => {
        try {
            const res = await getManyProfile()
            console.log(res);
            
            setProfiles(res.result)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        profileExplore()
    },[])
  return (
    <div className="flex p-24 flex-col gap-[32px] w-full h-fit">
      <div className="flex-col gap-[24px] h-[1336px]">
        <div className="flex-col gap-[24px] flex">
          <div className="flex items-center gap-[16px]">
            <p className="font-semibold text-xl">Explore creators</p>
          </div>
          <Input className="flex w-[243px] h-fit px-0  items-center gap-[10px] border " />
          <div className="flex w-[861px] h-fit p-[24px] gap-0 border bg-[#E4E4E7] rounded-[8px] ">
            <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center ">
                    {}
                </div>
                <div className="flex gap-[20px]">
                    <div className="flex felx-col gap-[8px] h-auto">
                        {}
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        {}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Explore;
