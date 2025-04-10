import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
const donationSchema = z.object({
  amount: z.number(),
  specialMessage: z.string().optional(),
  socialURLOrBuyMeACoffee: z.string().min(1),
});
export const postDonation = async (req: Request, res: Response) => {
  try {
    const { redirectId } = req.params;
    const userId = req.userid;
    const data = donationSchema.parse(req.body);
    if (data && userId && redirectId) {
      const { amount, specialMessage, socialURLOrBuyMeACoffee } = data;
      const donation = await prisma.donation.create({
        data: {
          amount,
          socialURLOrBuyMeACoffee,
          specialMessage: specialMessage || null,
          donorId: Number(userId),
          recipientId: Number(redirectId),
        },
      });
      res.status(200).json({ succes: true, createdDonation: donation });
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
  } finally {
    prisma.$disconnect();
  }
};
