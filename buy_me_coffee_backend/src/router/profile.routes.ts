import express from "express";
import { postProfile } from "../controller/profile/post-profile";

export const ProfileRouter = express.Router();

ProfileRouter.post("/:userId", postProfile);
