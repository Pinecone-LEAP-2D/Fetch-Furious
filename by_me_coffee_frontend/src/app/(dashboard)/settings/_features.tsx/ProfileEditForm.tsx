/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profileSchema } from "@/schema/zodSchema";
import { putProfile } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export default function ProfileEdit() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      avatarImage: "",
      name: "",
      about: "",
      socialMediaURL: "",
    },
  });
  const [uploadImage, setUploadImage] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState('')
  const ProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files) {
      const file = e.target.files[0];
      try {
        setUploadImage(true);
        const objecturl = URL.createObjectURL(file);
        setPreview(objecturl);
        const formData = new FormData();
        formData.append("file", file);
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
        setAvatarImage(result.secure_url)
        form.setValue("avatarImage", result.secure_url);
      } catch (error) {
        console.error(error);
      } finally {
        setUploadImage(false);
      }
    }
  };

  const updatedProfile = async (value: z.infer<typeof profileSchema>) => {
    try {
      console.log(value);

        const res = await putProfile(value, avatarImage)
        console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(updatedProfile)}
        className="flex w-[510px] h-auto flex-col gap-[24px]"
      >
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-2xl">My account</p>
        </div>
        <div className="flex p-6 flex-col gap-[24px] border rounded-xl ">
          <p className="font-bold text-base">Personal Info</p>
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
                      onChange={ProfileImage}
                      disabled={uploadImage}
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
                    className="flex px-3 py-4 items-center"
                  />
                </FormControl>
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
                    className="flex px-3 py-4 items-center"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMediaURL"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[12px]">
                <Label className="font-medium text-sm">Social URL media</Label>
                <FormControl>
                  <Input
                  {...field}
                    placeholder="https://"
                    className="flex px-3 py-4 items-center"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex px-4 py-4 justify-center items-center gap-[8px]"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
