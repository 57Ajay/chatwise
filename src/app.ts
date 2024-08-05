import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import feedRouter from "./routes/socialMediaFeedRoutes";


const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use("/api/feed", feedRouter);


export default app;