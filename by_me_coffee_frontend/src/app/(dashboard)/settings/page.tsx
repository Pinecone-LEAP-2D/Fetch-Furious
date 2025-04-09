"use client";

import { Button } from "@/components/ui/button";
/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components/ui/input";
import { postProfile } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Camera } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
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

const Settings = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState("");

  const profileSchema = z.object({
    avatarImage: z.string().optional(),
    name: z
      .string()
      .min(1, "please enter name")
      .min(3, "Username must be at least 3 characters"),
    about: z.string().min(1, "Please enter info about yourself"),
    socialMediaURL: z.string().min(1, "Please enter a social link"),
  });

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
      await postProfile(values, avatarImage);
    } catch (error) {
      console.log(error);
    }
  };

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
        console.log(result);

        setAvatarImage(result.secure_url);
      } catch (error) {
        console.error(error);
      } finally {
        setUploadImage(false);
      }
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(saveChanges)}
        className="flex w-[510px] h-auto flex-col gap-[24px]"
      >
        <div className="flex flex-col w-full max-w-[672px] gap-[32px] h-auto">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-2xl">My account</p>
          </div>
          <div className="flex p-6 flex-col gap-[24px] border rounded-xl ">
            <p className="font-bold text-base">Personal Info</p>
            <div className="flex flex-col gap-[12px]">
              <Label>Add photo
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
              <Input
                className="hidden"
                type="file"
                onChange={ProfileImage}
                disabled={uploadImage}
              />
              </Label>
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex gap-[8px] flex-col">
                <Label className="font-medium text-sm">Name</Label>
                <Input
                  placeholder="Enter name"
                  className="flex px-3 py-4 items-center"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex gap-[8px] flex-col">
                <Label className="font-medium text-sm">About</Label>
                <Input
                  placeholder="enter about"
                  className="flex px-3 py-10 items-center"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex gap-[8px] flex-col">
                <Label className="font-medium text-sm">Social media URL</Label>
                <Input
                  placeholder="https://"
                  className="flex px-3 py-4 items-center"
                />
              </div>
            </div>
            <Button className="flex px-4 py-4 justify-center items-center gap-[8px]">
              Save Changes
            </Button>
          </div>
          <div className="flex p-6 flex-col gap-[24px] border rounded-xl">
            <p className="font-bold text-base">Payment details</p>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[24px] ">
                <Label className="font-semibold text-sm">Select country</Label>
                <Select>
                  <SelectTrigger className="w-[460px]">
                    <SelectValue placeholder="Select a fruit" />
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
              </div>
              <div className="flex gap-[12px] justify-between">
                <div className="flex flex-col gap-[8px]">
                  <Label className="font-semibold text-sm">First name</Label>
                  <Input
                    className="flex px-3 py-4 items-center "
                    placeholder="Enter firstName"
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <Label className="font-semibold text-sm">Last name</Label>
                  <Input
                    className="flex px-3 py-4 items-center "
                    placeholder="Enter lastName"
                  />
                </div>
              </div>
              <div className="flex h-[62px] flex-col gap-[8px]">
                <Label className="font-semibold text-sm">
                  Enter card number
                </Label>
                <Input
                  className="flex px-3 py-4 items-center w-[460px]"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                />
              </div>
              <div className="flex justify-between gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  <Label className="font-semibold text-sm">Expires</Label>
                  <Select>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Select a fruit" />
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
                </div>
                <div className="flex flex-col gap-[8px]">
                  <Label className="font-semibold text-sm">Year</Label>
                  <Input className="w-[130px] flex flex-col gap-[4px]" type="date"/>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <Label className="font-semibold text-sm">CVC</Label>
                  <Input className="w-[130px] flex flex-col gap-[4px]" placeholder="CVC"/>
                </div>
              </div>
              <Button className="flex h-[40px] px-4 py-4 justify-center items-center gap-[8px]">Save Changes</Button>
            </div>
          </div>
          <div className="flex p-6 flex-col gap-[24px] border rounded-xl ">
            <p className="font-bold text-base">Set a new password</p>
            <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[8px]">
                    <Label className="font-semibold text-sm">New password</Label>
                    <Input className="flex h-[40px] px-3 py-4 items-center " placeholder="Enter new password"/>
                </div>
                <div className="flex flex-col gap-[8px]">
                    <Label className="font-semibold text-sm">Confirm password</Label>
                    <Input className="flex h-[40px] px-3 py-4 items-center " placeholder="Enter new password"/>
                </div>
            </div>
            <Button className="flex h-[40px] px-4 py-4 items-center justify-center gap-[8px]">Save Changes</Button>
          </div>
          <div className="flex p-6 flex-col gap-[24px] border rounded-xl ">
            <p className="font-bold text-base">Success page</p>
            <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[8px]">
                    <Label className="font-semibold text-sm">Confirmation message</Label>
                    <Input className="flex h-[40px] px-3 py-10 items-center " placeholder="Enter message"/>
                </div>
            </div>
            <Button className="flex h-[40px] px-4 py-4 items-center justify-center gap-[8px]">Save Changes</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
export default Settings;
