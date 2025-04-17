"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getManyProfile } from "@/utils/request";
import { Profile } from "@prisma/client";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileRowSkeleton from "../_components/ProfileRowSkeleton";
import ProfileRow from "../_components/ProfileRow";

export function ExploreUser() {
  const [searchValue, setSearchValue] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const page = 1;
  const [isFetching, setIsFetching] = useState(false);
  const profileExplore = async () => {
    try {
      setIsFetching(true);
      const res = await getManyProfile(page, searchValue);
      console.log(res);
      setProfiles(res.results);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    profileExplore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-[250px] flex h-full relative items-center">
          <Search className="absolute left-4" size={18} />
          <Input
            className=" pl-10 h-full w-full rounded-[30px] font-semibold bg-black/3 hover:bg-black/8"
            placeholder="Search a creators"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] w-full  p-0 rounded-xl h-[550px]">
        <DialogHeader className="rounded-xl">
          <div className="w-full flex items-center relative overflow-scroll">
            <Search className="absolute left-4" size={18} />
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              className="rounded-b-none rounded-t-xl bg-black/10 pl-12 py-6 text-xl"
            />
          </div>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <DialogClose className="absolute -right-12">
            <X size={40} stroke="#FFFFFF" />
          </DialogClose>
        </DialogHeader>
        <div className="w-full flex flex-col overflow-scroll">
          {isFetching
            ? [...Array(5)].map((_, i) => <ProfileRowSkeleton key={i} />)
            : profiles.map((profile, i) => (
                <ProfileRow key={i} profile={profile} i={i} />
              ))}
          Want me to help wra
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
