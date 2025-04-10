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
export const profileSchema = z.object({
    avatarImage: z.string(),
    name: z
      .string()
      .min(1, "please enter name")
      .min(3, "Username must be at least 3 characters"),
    about: z.string().min(1, "Please enter info about yourself"),
    socialMediaURL: z.string().min(1, "Please enter a social link"),
  });
  export const passwordSchema = z.object({
    password : z.string().min(1, "please enter your password").min(8, "Password must be at least 8 characters"),
    confirmPassword : z.string().min(1, "please confirm your password")
  }).refine((data)=>data.confirmPassword === data.password,{
    message : 'Password do not match',
    path:['confirmPassword']
  })