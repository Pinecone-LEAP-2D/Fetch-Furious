import express from "express";
import { postProfile } from "../controller/profile/post-profile";
import { authenticationJWT } from "../middleware/User/jwt";

export const ProfileRouter = express.Router();

ProfileRouter.post("/:userId", authenticationJWT, postProfile);
