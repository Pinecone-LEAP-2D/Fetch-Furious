"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Profile from "./_features/Profile";
import BankCard from "./_features/BankCard";

const profileSchema = z.object({
  avatarImage: z.string(),
  name: z.string().min(1, "please enter name"),
  about: z.string().min(1, "Please enter info about yourself"),
  socialMediaURL: z.string().min(1, "Please enter a social link"),
});

export default function Home() {
  const [step, setStep] = useState<"profile" | "bankCard">("profile");
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      avatarImage: "",
      name: "",
      about: "",
      socialMediaURL: "",
    },
  });
  const saveChanges = async (values: z.infer<typeof profileSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(saveChanges)}>
        <div className="flex w-full items-center h-auto flex-col gap-[24px]">
          {step === "profile" && <Profile setStep={setStep} form={form} />}
          {step === "bankCard" && <BankCard form={form} />}
        </div>
      </form>
    </FormProvider>
  );
}
