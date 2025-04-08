import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export const Profile = ({
  setStep, form
}: {
  setStep: (step: "profile" | "bankCard") => void;
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
    <div className="flex w-[510px] h-auto flex-col gap-[24px]">
      <div className="flex flex-col items-center gap-1">
        <p className="font-semibold text-2xl">Complete your profile page</p>
      </div>
      <div className="flex flex-col gap-[12px] items-center">
        <label className="font-semibold text-sm">Add photo</label>
        <div className="flex w-[160px] h-[160px] justify-center items-center bg-[#E4E4E7] border-dashed border rounded-full">
          <Camera  />
        </div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex w-[510px] h-[62px] gap-[8px]">
          <label className="font-semibold text-sm">Name</label>
          <Input
            className="flex px-8 py-6 h-[24px] items-center w-[486px] font-normal text-sm"
            placeholder="Enter your name here"
          />
        </div>
        <div className="flex w-[510px] h-[62px] gap-[8px] mt-[10px]">
          <label className="font-semibold text-sm">About</label>
          <Input
            className="flex px-8 py-6 h-[50px] items-center w-[486px] font-normal text-sm"
            placeholder="Write about yourself here"
          />
        </div>
        <div className="flex w-[510px] h-[62px] gap-[8px] mt-[10px]">
          <label className="font-semibold text-sm">Social media URL</label>
          <Input
            placeholder="https://"
          />
        </div>
      </div>
      <div className="flex  gap-[10px] w-[510px] mt-[10px]">
        <Button onClick={()=>setStep('bankCard')} className="flex w-[211px] h-fit px-8 py-4 justify-center items-center gap-[8px]">
            Continue
        </Button>
      </div>
    </div>
  );
};
export default Profile;
