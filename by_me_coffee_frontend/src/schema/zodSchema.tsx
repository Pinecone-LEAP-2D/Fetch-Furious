import { z } from "zod";

export const bankCardSchema = z.object({
  country: z.string().min(1, "Select country to continue"),
  firstName: z
    .string()
    .min(1, "First name must match")
    .min(3, "FirstName must be at least 3 characters"),
  lastName: z
    .string()
    .min(1, "Last name must match")
    .min(3, "LastName must be at least 3 characters"),
  cardNumber: z.string().min(1, "Invalid card number"),
  expiryDate: z.string().min(1, "Invalid month"),
});