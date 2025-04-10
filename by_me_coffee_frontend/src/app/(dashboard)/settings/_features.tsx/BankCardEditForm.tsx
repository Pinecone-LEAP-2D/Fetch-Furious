"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
import { months } from "@/lib/localFile";
import { bankCardSchema } from "@/schema/zodSchema";
import { putBankCard } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export default function BankCardEdit() {
  const now = new Date().getUTCFullYear();
  const years = Array.from({ length: 31 }, (_, idx) => now + idx);
  const form = useForm<z.infer<typeof bankCardSchema>>({
    resolver: zodResolver(bankCardSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      year: "",
      month: "",
    },
  });
  const updatedBanCard = async (value: z.infer<typeof bankCardSchema>) => {
    console.log(value);
    
    try {
      const res = await putBankCard(value);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const notify = () => toast("Success Pay");
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
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
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
                <FormMessage/>
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
                  <FormMessage/>
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
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='cardNumber'
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
                <FormMessage/>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select a Month" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <SelectGroup>
                          <SelectLabel>Month</SelectLabel>
                          {months.map((month, index) => (
                            <SelectItem
                              key={index}
                              value={(index + 1).toString()}
                            >
                              {month}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage/>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Select a Month" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectGroup>
                        <SelectLabel>Month</SelectLabel>
                        {years.map((year, index) => (
                          <SelectItem key={index} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage/>
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
            onClick={() => notify}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
