import app from "./app";
import dbConnect from "./db/dbConnect";
import { config } from "dotenv";

config();

dbConnect().then(()=>{
  app.listen(process.env.PORT || 3000, ()=>{
      console.log(`Server is running on port ${process.env.PORT}`);
  })
}).catch((err: any)=>{
  console.log("Database connection Error", err);
});