import express from "express";
import { postProfile } from "../controller/profile/post-profile";
import { authenticationJWT } from "../middleware/User/jwt";
import { getProfile } from "../controller/profile/get-profile";
import { getManyProfiles } from "../controller/profile/getManyProfile";

export const ProfileRouter = express.Router();

ProfileRouter.post("/", authenticationJWT, postProfile);
ProfileRouter.get("/user/:userId", authenticationJWT, getProfile);
ProfileRouter.get("/explore", authenticationJWT, getManyProfiles);
