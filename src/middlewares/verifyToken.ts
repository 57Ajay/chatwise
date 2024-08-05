import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare module 'express-serve-static-core' {
    interface Request {
      user: any;
    }
  }
  
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(403).json({ message: "A token is required for authentication" });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    return next();
  };
  
  export default verifyToken;