import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Camera } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
const profileSchema = z.object({
  avatarImage: z.string().min(1, "Please enter image"),
  name: z
    .string()
    .min(1, "please enter name")
    .min(3, "Username must be at least 3 characters"),
  about: z.string().min(1, "Please enter info about yourself"),
  socialMediaURL: z.string().min(1, "Please enter a social link"),
});
export const Profile = ({
  setStep,
}: {
  setStep: (step: "profile" | "bankCard") => void;
}) => {
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
      await axios.post(`http://localhost:4000/profile/8`)
      setStep('bankCard')
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
        <div className="flex flex-col items-center gap-1">
          <p className="font-semibold text-2xl">Complete your profile page</p>
        </div>
        <FormField
          control={form.control}
          name="avatarImage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Label className="flex flex-col gap-[12px] items-center">
                  <p className="font-semibold text-sm">Add photo</p>
                  <div className="flex w-[160px] h-[160px] justify-center items-center bg-[#E4E4E7] border-dashed border rounded-full">
                    <Camera type="file" />
                  </div>
                  <Input {...field} className="hidden" type="file" />
                </Label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-[12px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Name</Label>
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
            name="about"
            render={({ field }) => (
              <FormItem>
                <Label>About</Label>
                <FormControl>
                  <Textarea
                    className="resize-none h-[131px] py-2 px-3"
                    {...field}
                    placeholder="Write about yourself here"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMediaURL"
            render={({ field }) => (
              <FormItem>
                <Label>Social Media URL</Label>
                <FormControl>
                  <Input
                    className="py-2 px-3"
                    {...field}
                    placeholder="https://"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex  gap-[10px] w-[510px] justify-end">
          <Button type="submit" className="px-20 py-2" onClick={() => setStep('bankCard')}>
            Continue
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
export default Profile;