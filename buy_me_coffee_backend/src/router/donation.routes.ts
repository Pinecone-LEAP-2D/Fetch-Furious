import express from "express";
import { authenticationJWT } from "../middleware/User/jwt";
import { postDonation } from "../controller/donation/post-donation";

export const DonationRouter = express.Router();

DonationRouter.post("/:redirectId", authenticationJWT, postDonation);

