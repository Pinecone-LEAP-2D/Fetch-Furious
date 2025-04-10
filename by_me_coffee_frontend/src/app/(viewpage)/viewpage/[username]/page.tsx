/* eslint-disable @next/next/no-img-element */
"use client";



import { getDonation, getProfile } from "@/utils/request";
import { Profile } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageUpload from "../_features/ImageUpload";
import DonationZone from "../_features/DonaitionZone";
import { EditProfile } from "../_features/EditProfile";
type Donation = {
  donor: { id: number; profile: Profile };
  amount: number;
  createdAt: Date;
  recipientId: null;
  socialURLOrBuyMeACoffee: string;
  specialMessage: string;
};
export default function Home() {
  const { username } = useParams();

  const [profile, setProfile] = useState<Profile>();
  const [donations, sendDonation] = useState<Donation[]>();
  const fetchProfile = async () => {
    try {
      if (!username) return;
      const response = await getProfile(username);
      console.log(response);
      setProfile(response?.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getRecivedDonnation = async () => {
    if (!username) return;
    const response = await getDonation(username);
    sendDonation(response.data);
  };
  useEffect(() => {
    fetchProfile();
    getRecivedDonnation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!profile?.avatarImage) {
    return <div>user not found</div>;
  }
  return (
    <div className="w-scree items-center flex flex-col">
      <div className="w-full h-[500px]">
        {profile.backgroundImage ? (
          <div className="w-full h-full overflow-hidden relative flex items-center">
            <img
              alt="backgroundImage"
              className="w-full h-auto"
              src={profile.backgroundImage}
            />
          </div>
        ) : (
          <ImageUpload />
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
            <EditProfile />
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
          <div className="p-6 border rounded-lg flex flex-col gap-4">
            <div className="text-lg font-semibold">Recent supporters</div>
            <div className="h-[250px] w-full overflow-scroll p-6 flex gap-4 flex-col border rounded-lg">
              {donations?.map((donation: Donation, index) => (
                <div key={index} className="w-full flex gap-3">
                  <img
                    src={
                      donation.donor.profile.avatarImage
                        ? donation.donor.profile.avatarImage
                        : "/next.svg"
                    }
                    alt="avatar image"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col gap-3">
                    <div className="font-semibold text-lg">
                      {donation.donor.profile.name} bought ${donation.amount}{" "}
                      coffee
                    </div>
                    {donation.specialMessage && (
                      <div>{donation.specialMessage}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DonationZone profiles={profile} getRecivedDonnation={getRecivedDonnation}/>
      </div>
    </div>
  );
}
