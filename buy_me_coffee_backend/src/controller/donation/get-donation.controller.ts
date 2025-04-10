import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getDontion = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { amount, date } = req.query;
    if (userId) {
      const donations = await prisma.donation.findMany({
        where: {
          recipientId: parseInt(userId),
          createdAt: {
            gte: new Date(String(date)).toISOString(),
          },
        },
        include: {
          donor: {
            select: {
              id: true,
              profile: {
                select: {
                  name: true,
                  avatarImage: true,
                },
              },
            },
          },
        },
      });
      const totalAmount = donations.reduce(
        (sum, donation) => sum + donation.amount,
        0
      );
      const donationsfiltered =
        donations.filter((donation) => donation.amount === Number(amount)) ||
        donations;
      if (amount) {
        res.status(200).send({ data: donationsfiltered, totalAmount });
      } else {
        res.status(200).send({ data: donations, totalAmount });
      }
    }
  } catch (error) {
    res.status(500).send({ error: "server error" });
  }
};
