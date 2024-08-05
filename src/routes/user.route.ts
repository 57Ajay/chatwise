import express from "express";
import verifyToken from "../middlewares/verifyToken";
import { registerUser, loginUser, logOutUser, userProfile } from "../controllers/user.controller";
const userRouter = express.Router();


userRouter.post('/register', registerUser);


userRouter.post('/login', loginUser);


userRouter.post('/logout', logOutUser);

userRouter.get('/profile', verifyToken, userProfile);

export default userRouter;