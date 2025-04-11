/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

import { useProfile } from "@/provider/ProfileProvider";
import { Copy } from "lucide-react";
import { getDonationWithFilter } from "@/utils/request";
import { useEffect, useState } from "react";
import { Profile } from "@prisma/client";
import PageLoading from "@/components/PageLoading";
import { useRouter } from "next/navigation";
type Donation = {
  donor: { id: number; profile: Profile };
  amount: number;
  createdAt: Date;
  recipientId: null;
  socialURLOrBuyMeACoffee: string;
  specialMessage: string;
};
export default function Home() {
  const amounts = [1, 3, 5, 10, 15, 20];
  const router = useRouter()
  const [amount, setAmount] = useState<number | null>(null);
  const [donations, setDonation] = useState<Donation[]>();
  const [totalAmount, setTotalAmount] = useState(0);
  const [dateFilter, setDateFilter] = useState<string | number>(30);
  const { profile , loading} = useProfile();
  const fetchDonation = async () => {
    if (profile) {
      const response = await getDonationWithFilter(
        profile?.userId,
        amount,
        dateFilter
      );
      setDonation(response.data);
      setTotalAmount(response.totalAmount);
    }
  };
  useEffect(() => {
    fetchDonation();
    console.log(amount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, dateFilter, loading]);
  const handleSelect = (value: string) => {
    setAmount(Number(value));
  };
  const handleSelectDate = (value: string) => {
    setDateFilter(Number(value));
  };
  if (!profile) {
    return <PageLoading/>;
  }
  return (
    <div className="w-full rounded-xl">
      <div className="flex flex-col  w-full border p-4 m-2 rounded-sm">
        <div className="flex justify-between">
          <div className="flex items-center ">
            <img
              src={profile?.avatarImage ? profile.avatarImage : "/next.svg"}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col px-2">
              <p>{profile?.name}</p>
              <p>{profile?.socialMediaURL}</p>
            </div>
          </div>
          <div className="flex bg-black text-white rounded w-50 justify-center items-center">
            <Copy />
            <p className="px-1">Share page link</p>
          </div>
        </div>
        <hr className="mt-2 " />
        <div className="flex py-4 items-center ">
          <p className="font-bold text-xl px-3">Earnings</p>
          <Select defaultValue="last 30 days" onValueChange={handleSelectDate}>
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Days</SelectLabel>
                <SelectItem value="30">Last 30days</SelectItem>
                <SelectItem value="90">Last 3month</SelectItem>
                <SelectItem value="10000">All time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="text-3xl mx-2 p-2 font-bold">{totalAmount}</p>
      </div>
      <div className="flex justify-between items-center p-2 m-2">
        <p className="font-bold">Recent transactions</p>
        <div className="flex items-center px-2 row-reverse  h-8 rounded-sm justify-center">
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-[180px] row-reverse ">
              <SelectValue placeholder="Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Amount</SelectLabel>
                {amounts.map((amount, index) => (
                  <SelectItem key={index} value={amount.toString()}>
                    ${amount}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {donations?.map((donation, index) => (
        <div key={index} className=" border p-5 w-full rounded-sm">
          <div className="flex items-center  justify-between">
            <div className="flex items-center">
              <img
                className="rounded-full w-10 h-10 px-4 bg-gray-200 text-center flex items-center justify-center"
                src={
                  donation.donor.profile.avatarImage
                    ? donation.donor.profile.avatarImage
                    : ""
                }
              />
              <div className=" px-2">
                <div className="flex gap-2">Guest
                  <div onClick={()=>router.push(`/viewpage/${donation.donor.id}`)} className="font-bold cursor-pointer hover:underline"> {donation.donor.profile.name}</div>
                </div>
                <p className="cursor-pointer hover:underline">{donation.socialURLOrBuyMeACoffee}</p>
              </div>
            </div>
            <div>
              <p className="font-bold">
                + <span>${donation.amount}</span>
              </p>
              <p>{}10 hours ago</p>
            </div>
          </div>
          <p className="p-2">{donation.specialMessage}</p>
        </div>
      ))}
    </div>
  );
}
