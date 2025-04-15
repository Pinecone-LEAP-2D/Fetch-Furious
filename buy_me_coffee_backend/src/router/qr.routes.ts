import express from "express";
import { authenticationJWT } from "../middleware/User/jwt";
import { generateQrCode } from "../controller/donation/generateQr";
import { generateQrCodeUnsigned } from "../controller/donation/getQrUnSigned";

export const qrRouter  = express.Router();

qrRouter.post('/signed/:userId',authenticationJWT ,generateQrCode)
qrRouter.post('/unsigned/:userId', generateQrCodeUnsigned)