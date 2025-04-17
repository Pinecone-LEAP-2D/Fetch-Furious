"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function UserName({
  form,
  setStep,
}: {
  form: UseFormReturn<
    {
      email: string;
      password: string;
      username: string;
      about?: string | undefined;
    },
    {
      email: string;
      password: string;
      username: string;
      about?: string | undefined;
    }
  >;
  setStep: (step: "username" | "emailAndPassword") => void;
}) {
  const [loading, setLoading] = useState(false);
  const signUpStep1 = async () => {
    if (form.watch("username").length < 3) return;
    setLoading(true);
    try {
      await axios.post("/api/auth/username", {
        username: form.watch("username"),
      });
      await form.clearErrors();
      setStep("emailAndPassword");
    } catch (error) {
      console.log(error);
      form.setError("username", { message: "username already taken" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-2xl font-bold">Create your account</div>
        <div className="text-[#71717A] text-sm">
          Choose a username for your page
        </div>
      </div>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <Label>Username</Label>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your username"
                {...field}
                onClick={() => form.clearErrors()}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        disabled={loading}
        onClick={signUpStep1}
        variant={form.watch("username").length < 3 ? "secondary" : "default"}
        className={`w-full text-white py-2 cursor-pointer  ${
          form.watch("username").length < 3  && "cursor-not-allowed"
        }`}
      >
        {loading && <Loader2 className="animate-spin" />}
        Continue
      </Button>
    </div>
  );
}
