import express from "express";
import { getBank } from "../controller/bank/get-bank";
import { postBank } from "../controller/bank/post-bank";
import { authenticationJWT } from "../middleware/User/jwt";

export const BankRouter = express.Router();

BankRouter.get('/:userId', getBank)
BankRouter.post('/',authenticationJWT, postBank)