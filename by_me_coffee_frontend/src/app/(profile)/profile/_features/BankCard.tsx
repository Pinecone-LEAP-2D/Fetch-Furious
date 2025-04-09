"use client";
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
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { bankCardSchema } from "@/schema/zodSchema";
import { addBankCard } from "@/utils/request";

export const BankCard = () => {
  const router = useRouter();
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
  const saveChanges = async (values: z.infer<typeof bankCardSchema>) => {
    try {
      await addBankCard(values);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(saveChanges)}
        className="flex w-[510px] h-auto flex-col gap-[24px]"
      >
        <div className="flex w-[510px] flex-col h-auto">
          <div className="flex p-[24px] flex-col gap-[6px]">
            <p className="font-semibold text-2xl">
              How would you like to be paid?
            </p>
            <p className="font-normal text-sm text-gray-400">
              Enter location and payment details
            </p>
          </div>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Label className="flex flex-col gap-[12px] items-center">
                    <p className="font-semibold text-sm">Select country</p>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-[400px]">
                        <SelectValue placeholder="Select" />
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
                  </Label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-[12px] mt-[20px]">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <Label>FirstName</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name here"
                      className="py-2 px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <Label>LastName</Label>
                  <FormControl>
                    <Input
                      className="resize-none"
                      {...field}
                      placeholder="Enter your name here"
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
              <FormItem className="mt-[10px]">
                <Label>Enter Card number</Label>
                <FormControl>
                  <Input
                    className="resize-none "
                    {...field}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-[16px] justify-between mt-[15px]">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <Label>Expires</Label>
                  <FormControl>
                    <Input className="resize-none " {...field} type="month" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <Label>Year</Label>
                  <FormControl>
                    <Input className="resize-none" {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <Label>CVC</Label>
                  <FormControl>
                    <Input
                      className="resize-none "
                      {...field}
                      placeholder="CVC"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-[10px] mt-[20px]">
            <Button
              className="flex w-[211px] h-fit px-8 py-4 justify-center items-center gap-[8px]"
              type="submit"
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
export default BankCard;
