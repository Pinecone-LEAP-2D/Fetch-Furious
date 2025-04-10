/* eslint-disable @next/next/no-img-element */
"use client";

import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useProfile } from "@/provider/ProfileProvider";
import { putProfile } from "@/utils/request";

const profileSchema = z.object({
  avatarImage: z.string().optional(),
  name: z
    .string()
    .min(1, "please enter name")
    .min(3, "Username must be at least 3 characters"),
  about: z.string().min(1, "Please enter info about yourself"),
  socialMediaURL: z.string().min(1, "Please enter a social link"),
});
export function EditProfile() {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="cursor-pointer">
          Edit Page
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(editProfile)}
            className="flex h-auto flex-col gap-[24px]"
          >
            <FormField
              control={form.control}
              name="avatarImage"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Label className="flex flex-col gap-[12px] items-center">
                      <p className="font-semibold text-sm">Add photo</p>
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
                        onChange={generatePreview}
                      />
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
            <div className="flex  gap-[10px] justify-end">
              <Button type="submit" className="px-20 py-2">
                Continue
              </Button>
            </div>
          </form>
        </FormProvider>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
