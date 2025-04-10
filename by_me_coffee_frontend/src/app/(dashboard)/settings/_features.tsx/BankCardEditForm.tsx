"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bankCardSchema } from "@/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export default function BankCardEdit() {
  const form = useForm<z.infer<typeof bankCardSchema>>({
    resolver: zodResolver(bankCardSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      expiryDate: "",
    },
  });
  return (
    <FormProvider {...form}>
      <form>
        <div className="flex p-6 flex-col gap-[24px] border w-[510px] rounded-xl mt-[20px]">
          <p className="font-bold text-base">Payment details</p>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[24px] ">
              <Label className="font-semibold text-sm">Select country</Label>
              <Select>
                <SelectTrigger className="w-[460px]">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    <SelectItem value="America">🇺🇸America</SelectItem>
                    <SelectItem value="China">🇨🇳China</SelectItem>
                    <SelectItem value="Russia">🇷🇺Russia</SelectItem>
                    <SelectItem value="Thailand">🇹🇭Thailand</SelectItem>
                    <SelectItem value="Mongolia">🇲🇳Mongolia</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-[12px] justify-between">
              <div className="flex flex-col gap-[8px]">
                <Label className="font-semibold text-sm">First name</Label>
                <Input
                  className="flex px-3 py-4 items-center "
                  placeholder="Enter firstName"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <Label className="font-semibold text-sm">Last name</Label>
                <Input
                  className="flex px-3 py-4 items-center "
                  placeholder="Enter lastName"
                />
              </div>
            </div>
            <div className="flex h-[62px] flex-col gap-[8px]">
              <Label className="font-semibold text-sm">Enter card number</Label>
              <Input
                className="flex px-3 py-4 items-center w-[460px]"
                placeholder="XXXX-XXXX-XXXX-XXXX"
              />
            </div>
            <div className="flex justify-between gap-[16px]">
              <div className="flex flex-col gap-[8px]">
                <Label className="font-semibold text-sm">Expires</Label>
                <Select>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Select a Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Month</SelectLabel>
                      <SelectItem value="uly">July</SelectItem>
                      <SelectItem value="September">September</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-[8px]">
                <Label className="font-semibold text-sm">Year</Label>
                <Input
                  className="w-[130px] flex flex-col gap-[4px]"
                  type="date"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <Label className="font-semibold text-sm">CVC</Label>
                <Input
                  className="w-[130px] flex flex-col gap-[4px]"
                  placeholder="CVC"
                />
              </div>
            </div>
            <Button className="flex h-[40px] px-4 py-4 justify-center items-center gap-[8px]">
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
