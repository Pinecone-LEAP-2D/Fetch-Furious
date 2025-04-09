import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { date, z } from "zod";
const bankCardSchema = z.object({
  country: z.string().min(1, "country required"),
  firstName: z.string().min(1, "firsname required"),
  lastName: z.string().min(1, "firsname required"),
  cardNumber: z.string().min(1, "firsname required"),
  expiryDate: z.string(),
});
export const putBank = async (req: Request, res: Response) => {
    try {
        const userId = req.userid
        const data = bankCardSchema.parse(req.body);
        if (userId) {
        
        
        const {bankCardId} = req.body
        console.log(userId, bankCardId);
        console.log(bankCardId);
        
        if (bankCardId) {
            if (data) {
            const id = parseInt(userId);
            const {firstName, lastName, cardNumber, expiryDate, country} = data
            const bank = await prisma.bankCard.update({
              where: {
                userId: id,
              },
              data: {
                firstName,
                lastName,
                cardNumber,
                country,
                expiryDate: new Date(expiryDate).toISOString(),
                user: {
                    connect: {
                        id
                    }
                }
              },
            });
          }
        }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message : "type error"
        })
    }
}