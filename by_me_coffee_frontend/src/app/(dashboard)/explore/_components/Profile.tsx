/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Profile = {
  id: number;
  name: string;
  successMessage: string | null;
  avatarImage: string | null;
  about: string | null;
  socialMediaURL: string | null;
  backgroundImage: string | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function ProfileComp({ profile }: { profile: Profile }) {
  const router = useRouter();
  return (
    <div className="w-full p-6 flex flex-col gap-3 border rounded-xl">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatarImage || "/next.svg"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-semibold text-lg md:text-2xl">{profile.name}</p>
        </div>
        <Button onClick={() => router.push(`/viewpage/${profile.userId}`)}>
          View profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <div>
          <h3 className="font-semibold text-base">About {profile.name}</h3>
          <p className="font-normal text-sm mt-2 break-words">
            {profile.about || "No information provided"}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-base">Social media URL</h3>
          {profile.socialMediaURL ? (
            <a
              href={profile.socialMediaURL}
              className="font-normal text-sm mt-2 block text-blue-600 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.socialMediaURL}
            </a>
          ) : (
            <p className="font-normal text-sm mt-2 text-gray-500">
              No social media provided
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
