import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userid = parseInt(userId);
    if (typeof userid === "number") {
      const profile = await prisma.profile.findUnique({
        where: {
          userId: userid,
        },
        include: {
          user: {
            select: {
              receivedDonations: {
                select: {
                  amount: true,
                  specialMessage: true,
                  socialURLOrBuyMeACoffee: true,
                  donorId: true,
                  recipientId: true,
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
              },
            },
          },
        },
      });
      res.status(200).json({ result: profile });
    }
  } catch (error) {
    res.status(500).json({ error: "sever error" });
  }
};
