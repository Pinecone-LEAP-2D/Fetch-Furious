/* eslint-disable @next/next/no-img-element */
import { Profile } from "@prisma/client";

export default function ProfileRow({
  profile,
  i,
}: {
  profile: Profile;
  i: number;
}) {
  return (
    <div className="flex gap-4 w-full p-3 items-center">
      <div className="text-sm w-3">#{i + 1}</div>
      <img
        className="w-10 h-10 overflow-hidden rounded-full"
        src={profile.avatarImage ? profile.avatarImage : "vercel.svg"}
        alt="avatar"
      />
      <div className="flex flex-col">
        <div className="font-semibold">{profile.name}</div>
        <div className="truncate w-96">
          {profile.about}
        </div>
      </div>
    </div>
  );
}
