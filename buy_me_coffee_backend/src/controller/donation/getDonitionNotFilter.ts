import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getDontionNotFilter = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const donations = await prisma.donation.findMany({
        where: {
          recipientId: parseInt(userId),
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

      res.status(200).send({ data: donations });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "server error" });
  }
};

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const getDonation = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const { minAmount, maxAmount, timePeriod } = req.query; // Шүүлтүүрүүд

//     // Шүүлтүүрийн хугацаа, мөн хандивын хэмжээний дүн
//     const filters: any = {
//       recipientId: parseInt(userId),
//     };

//     // Хугацааны шүүлтүүр
//     if (timePeriod) {
//       const currentDate = new Date();
//       let startDate: Date;

//       if (timePeriod === '30days') {
//         startDate = new Date(currentDate.setDate(currentDate.getDate() - 30)); // 30 өдөр
//       } else if (timePeriod === '2years') {
//         startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 2)); // 2 жил
//       }

//       filters.createdAt = {
//         gte: startDate, // Хугацааны шүүлтүүр
//       };
//     }

//     // Хандивын хэмжээний шүүлтүүр
//     if (minAmount || maxAmount) {
//       filters.amount = {
//         gte: minAmount ? parseFloat(minAmount as string) : 0,
//         lte: maxAmount ? parseFloat(maxAmount as string) : Infinity,
//       };
//     }

//     const donations = await prisma.donation.findMany({
//       where: filters,
//       include: {
//         donor: {
//           select: {
//             id: true,
//             profile: {
//               select: {
//                 name: true,
//                 avatarImage: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     // Хандивын нийт дүнг тооцоолох
//     const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

//     res.status(200).json({ data: donations, totalAmount });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
