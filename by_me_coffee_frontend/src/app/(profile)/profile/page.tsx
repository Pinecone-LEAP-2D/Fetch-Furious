"use client";

import { useEffect, useState } from "react";
import BankCard from "./_features/BankCard";
import Profile from "./_features/Profile";
import { useProfile } from "@/provider/ProfileProvider";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState<"profile" | "bankCard">("profile");
  const {profile, loading} = useProfile()
  useEffect(() => {
      if (profile && !loading) {
        router.push("/dashboard");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);
  return (
      <div className="flex w-full items-center h-auto flex-col gap-[24px]">
        {step === "profile" && <Profile setStep={setStep}/>}
        {step === "bankCard" && <BankCard />}
      </div>
  );
}
