import express from "express";
import cors from "cors";
const app = express();
import userRouter from "./routes/user.route";

app.use(express.json());
app.use(cors())

app.use('/api/user', userRouter);


export default app;