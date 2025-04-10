"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import ProfileEdit from "./_features.tsx/ProfileEditForm";
import BankCardEdit from "./_features.tsx/BankCardEditForm";
import PasswordEditForm from "./_features.tsx/PasswordEdit";

const Settings = () => {
  return (
    <div className="w-[510px]">
      <ProfileEdit />
      <BankCardEdit />
      <PasswordEditForm />
      <div className="flex p-6 flex-col gap-[24px] border rounded-xl mt-[20px]">
        <p className="font-bold text-base">Success page</p>
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[8px]">
            <Label className="font-semibold text-sm">
              Confirmation message
            </Label>
            <Input
              className="flex h-[40px] px-3 py-10 items-center "
              placeholder="Enter message"
            />
          </div>
        </div>
        <Button className="flex h-[40px] px-4 py-4 items-center justify-center gap-[8px]">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
export default Settings;
