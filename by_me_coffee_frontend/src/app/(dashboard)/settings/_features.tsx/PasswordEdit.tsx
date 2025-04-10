import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordSchema } from "@/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export default function PasswordEditForm() {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <FormProvider {...form}>
      <form>
        <div className="flex p-6 flex-col gap-[24px] border rounded-xl mt-[20px]">
          <p className="font-bold text-base">Set a new password</p>
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[8px]">
              <Label className="font-semibold text-sm">New password</Label>
              <Input
                className="flex h-[40px] px-3 py-4 items-center "
                placeholder="Enter new password"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Label className="font-semibold text-sm">Confirm password</Label>
              <Input
                className="flex h-[40px] px-3 py-4 items-center "
                placeholder="Enter new password"
              />
            </div>
          </div>
          <Button className="flex h-[40px] px-4 py-4 items-center justify-center gap-[8px]">
            Save Changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
