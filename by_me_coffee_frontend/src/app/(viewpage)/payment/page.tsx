"use client";

import { Button } from "@/components/ui/button";
import { useBank } from "@/provider/BankCardProvider";
import { useSearchParams } from "next/navigation";
import { sendDonation } from "@/utils/request";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const donorId = searchParams.get("donorid");
  const userId = searchParams.get("userid");
  const message = searchParams.get("speacialmessage") || "";
  const amount = searchParams.get("amount");
  const { bankcard } = useBank();
  console.log(bankcard);

  const sendDon = async () => {
    if (message && amount) {
      await sendDonation(
        {
          specialMessage: message,
          amount: Number(amount),
          socialURLOrBuyMeACoffee: "true",
        },
        Number(userId),
        Number(donorId)
      );
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Payment Page</h1>
      <div></div>
      <Button onClick={sendDon}>send donation</Button>
    </div>
  );
}
