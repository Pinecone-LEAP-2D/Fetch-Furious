import { UseFormReturn } from "react-hook-form";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const BankCard = ({
  form,
}: {
  form: UseFormReturn<
    {
      avatarImage: string;
      name: string;
      about: string;
      socialMediaURL: string;
    },
    {
      avatarImage: string;
      name: string;
      about: string;
      socialMediaURL: string;
    }
  >;
}) => {
  return (
    <div className="flex w-[510px] flex-col h-auto">
      <div className="flex p-[24px] flex-col gap-[6px]">
        <p className="font-semibold text-2xl">How would you like to be paid?</p>
        <p className="font-normal text-sm text-gray-400">
          Enter location and payment details
        </p>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <label className="font-medium text-sm">Select country</label>
          <Select>
            <SelectTrigger className="w-[400px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-between gap-[12px] mt-[20px]">
        <div className="flex flex-col gap-[5px]">
            <label className="font-medium text-sm">First name</label>
            <Input className="flex h-fit px-8 py-4 items-center font-medium text-sm" placeholder="Enter your name here"/>
        </div>
        <div className="flex flex-col gap-[5px]">
            <label className="font-medium text-sm">Last name</label>
            <Input className="flex h-fit px-8 py-4 items-center font-medium text-sm" placeholder="Enter your name here"/>
        </div>
      </div>
      <div className="flex h-[62px] flex-col gap-[8px] mt-[15px]">
        <label className="font-medium text-sm ">Enter card number</label>
        <Input className="flex h-fit px-8 py-6 items-center w-[400px]" placeholder="XXXX-XXXX-XXXX-XXXX"/>
      </div>
      <div className="flex gap-[16px] justify-between mt-[50px]">
        <div className="flex flex-col gap-[8px]">
            <label className="font-semibold text-md">Expries</label>
            <Input className="w-[159px] h-fit flex-col flex gap-[4px]" placeholder="month"/>
        </div>
        <div className="flex flex-col gap-[8px]">
            <label className="font-semibold text-md">Year</label>
            <Input className="w-[159px] h-fit flex-col flex gap-[4px]" placeholder="year"/>
        </div>
        <div className="flex flex-col gap-[8px]">
            <label className="font-semibold text-md">CVC</label>
            <Input className="w-[159px] h-fit flex-col flex gap-[4px]" placeholder="CVC"/>
        </div>
      </div>
      <div className="flex justify-end gap-[10px] mt-[20px]">
       <Button className="flex w-[211px] h-fit px-8 py-4 justify-center items-center gap-[8px]">Continue</Button>
      </div>
    </div>
  );
};
export default BankCard;
