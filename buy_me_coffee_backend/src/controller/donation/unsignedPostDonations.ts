import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
const donationSchema = z.object({
  amount: z.number(),
  specialMessage: z.string().optional(),
  socialURLOrBuyMeACoffee: z.string(),
});
export const postDonationUnsigned = async (req: Request, res: Response) => {
  try {
    const redirectId = req.query.recipientId;
    const data = donationSchema.parse(req.body);
    if (data && redirectId) {
      const { amount, specialMessage, socialURLOrBuyMeACoffee } = data;

      const donation = await prisma.donation.create({
        data: {
          amount,
          socialURLOrBuyMeACoffee,
          specialMessage,
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
