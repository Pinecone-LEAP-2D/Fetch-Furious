"use client";

import SelectCountry from "@/components/SelcectCountry";
import SelectMonth from "@/components/SelectMonth";
import SelectYear from "@/components/SelectYear";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBank } from "@/provider/BankCardProvider";
import { bankCardSchema } from "@/schema/zodSchema";
import { putBankCard } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function BankCardEdit() {
  const { bankcard } = useBank();

  const expiryDate = bankcard?.expiryDate
    ? new Date(bankcard.expiryDate)
    : new Date();
  const year = expiryDate.getFullYear();
  const month = expiryDate.getMonth() + 1;

  const form = useForm<z.infer<typeof bankCardSchema>>({
    resolver: zodResolver(bankCardSchema),
    values: {
      country: bankcard?.country ? bankcard.country : "",
      firstName: bankcard?.firstName ? bankcard.firstName : "",
      lastName: bankcard?.lastName ? bankcard.lastName : "",
      cardNumber: bankcard?.cardNumber ? bankcard.cardNumber : "",
      year: year.toString(),
      month: month.toString(),
    },
  });
  const updatedBanCard = async (value: z.infer<typeof bankCardSchema>) => {
    try {
      const res = await putBankCard(value);
      if (res) {
        toast(
          <div className="flex">
            Bank card updated <CheckCircle2Icon className="ml-10" />
          </div>
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(updatedBanCard)}
        className="flex p-6 flex-col gap-[24px] border w-[510px] rounded-xl mt-[20px]"
      >
        <p className="font-bold text-base">Payment details</p>
        <div className="flex flex-col gap-[24px]">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <Label className="font-semibold text-sm">Select country</Label>
                <SelectCountry
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-[12px] justify-between">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-semibold text-sm">Last name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      className="flex px-3 py-4 items-center "
                      placeholder="Enter lastName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-semibold text-sm">First name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      className="flex px-3 py-4 items-center "
                      placeholder="Enter lastName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <Label className="font-semibold text-sm">
                  Enter card number
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    className="flex px-3 py-4 items-center w-[460px]"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <Label className="font-semibold text-sm">Expires</Label>
                    <SelectMonth
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-semibold text-sm">Year</Label>
                  <SelectYear
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-[8px]">
              <Label className="font-semibold text-sm">CVC</Label>
              <Input
                className="w-[130px] flex flex-col gap-[4px]"
                placeholder="CVC"
              />
            </div>
          </div>
          <Button
            className="flex h-[40px] px-4 py-4 justify-center items-center gap-[8px]"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
