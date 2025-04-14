/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/provider/ProfileProvider";
import { profileSchema } from "@/schema/zodSchema";
import { putProfile } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export default function ProfileEdit() {
  const { profile } = useProfile();
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string | undefined | null>(
    profile?.avatarImage
  );
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      avatarImage: profile?.avatarImage ? profile.avatarImage : "",
      name: profile?.name ? profile.name : "",
      about: profile?.about ? profile.about : "",
      socialMediaURL: profile?.socialMediaURL ? profile.socialMediaURL : "",
    },
  });
  const generatePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files) {
      const file = e.target.files[0];
      const objecturl = URL.createObjectURL(file);
      setPreview(objecturl);
      setImage(file);
    }
  };
  const editProfile = async (value: z.infer<typeof profileSchema>) => {
    console.log(value);
    
    try {
      if (!image) return;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "coffee");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dovchxnto/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const result = await response.json();
      await putProfile(value, result.secure_url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-[510px]">
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-2xl">My account</p>
      </div>
      <div className="flex p-6 flex-col gap-[24px] border rounded-xl ">
        <p className="font-bold text-base">Personal Info</p>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(editProfile)}
            className="flex w-[510px] h-auto flex-col gap-[24px]"
          >
            <FormField
              control={form.control}
              name="avatarImage"
              render={({}) => (
                <FormItem className="flex flex-col gap-[12px]">
                  <Label>
                    Add photo
                    <div className="flex w-[160px] h-[160px] justify-center items-center bg-[#E4E4E7] border-dashed border rounded-full">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Camera type="file" />
                      )}
                    </div>
                    <FormControl>
                      <Input
                        className="hidden"
                        type="file"
                        onChange={generatePreview}
                      />
                    </FormControl>
                  </Label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[12px]">
                  <Label className="font-medium text-sm">Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter name"
                      className="flex px-3 py-4 w-[460px] items-center"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[12px]">
                  <Label className="font-medium text-sm">About</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Write about yourself here"
                      className="flex px-3 py-4 w-[460px] items-center"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaURL"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[12px]">
                  <Label className="font-medium text-sm">
                    Social URL media
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://"
                      className="flex px-3 w-[460px] py-4 items-center"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex px-4 py-4 justify-center items-center gap-[8px] w-[460px]"
            >
              Save Changes
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
