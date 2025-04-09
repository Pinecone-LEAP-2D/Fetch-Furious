"use client";

import { Button } from "@/components/ui/button";

import { getProfile } from "@/utils/request";
import { Profile } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageUpload from "../_features/ImageUpload";


export default function Home() {
  const { username } = useParams();

  const [profile, setProfile] = useState<Profile>();
  const fetchProfile = async () => {
    try {
      if (!username) return
      const response = await getProfile(username);
      console.log(response);
      setProfile(response?.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!profile?.avatarImage) {
    return <div>user not fou     nd</div>;
  }
  return (
    <div className="w-scree items-center flex flex-col">
      <div className="w-full h-[500px]">
        {profile.backgroundImage ? (
          <Image
            width={20}
            height={20}
            alt="backgroundImage"
            className="w-full h-full"
            src={profile.backgroundImage}
          />
        ) : (
          <ImageUpload/>
        )}
      </div>
      <div className="flex gap-6 w-[90%] absolute z-10 top-[400px]">
        <div className="flex flex-col gap-5 w-full bg-[#FFFFFF] rounded-lg">
          <div className="p-6 border rounded-lg flex flex-col gap-6">
            <div className="w-full flex justify-between border-b border-[#E4E4E7] pb-8">
              <div className="flex gap-3 items-center">
                <Image
                  alt="avatarImage"
                  height={12}
                  width={12}
                  src={
                    profile.avatarImage ? profile.avatarImage : "/vercel.svg"
                  }
                  className="border w-12 h-12 rounded-full"
                />
                <div className="text-xl font-semibold">{profile.name}</div>
              </div>
              <Button variant="secondary" className="cursor-pointer">
                Edit Page
              </Button>
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">About {profile.name}</p>
              <div>{profile?.about}</div>
            </div>
          </div>
          <div className="p-6 border rounded-lg flex flex-col gap-6">
            <div className="text-lg font-semibold">Social Media URL</div>
            <div>{profile?.socialMediaURL}</div>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="text-lg font-semibold">Recent supporters</div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full border rounded-lg bg-[#FFFFFF]">
          <div className="p-6"></div>
          <div className="p-6"></div>
          <div className="p-6"></div>
        </div>
      </div>
    </div>
  );
}
