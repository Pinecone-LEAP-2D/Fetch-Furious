import express from "express";
import { authenticationJWT } from "../middleware/User/jwt";
import { postDonation } from "../controller/donation/post-donation";
import { getDontion } from "../controller/donation/get-donation.controller";
import { getDontionNotFilter } from "../controller/donation/getDonitionNotFilter";
import { postDonationUnsigned } from "../controller/donation/unsignedPostDonations";

export const DonationRouter = express.Router();

DonationRouter.post('/unsigned', postDonationUnsigned)
DonationRouter.post("/:redirectId/:userId", postDonation);
DonationRouter.get('/:userId', getDontion)
DonationRouter.get('/all/:userId', getDontionNotFilter)

