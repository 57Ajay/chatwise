import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiError";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const registerUser = asyncHandler(async(req: Request, res:Response)=>{
    try {
        const { username, email, password, fullName } = req.body;
    

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
          return res.status(400).json(
            new ApiResponse("User already exists", null, 400)
          );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          fullName
        });
    
        await newUser.save();
    
        res.status(201).json(
            new ApiResponse("User registered successfully", {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                fullName: newUser.fullName
            }, 201)
        );
      } catch (error) {
        res.status(500).json(
            new ApiError("Internal Server Error", 500)
        );
      }
});


const loginUser = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json(
            new ApiResponse("Invalid credentials", null, 400)
          );
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json(
            new ApiResponse("Invalid credentials", null, 400)
          );
        }
    
        const token = jwt.sign(
          { id: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );
    
        
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
          maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
    
        res.json(
            new ApiResponse("User LoggedIn SuccessFully", {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                token: token
            }, 200)
        );
      } catch (error) {
        res.status(500).json({ message: "Error in user login", error: error.message });
      }
});

const logOutUser = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    res.clearCookie('token');
    res.json(
        new ApiResponse("Logged out successfully", null, 200)
    );
});

const userProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      console.log(user);
      if (!user) {
        return res.status(404).json(
          new ApiResponse("User not found", null, 404)
        );
      };
      return res.status(200).json(
        new ApiResponse("User Profile", user, 200)
      )
    } catch (error) {
      res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
  })

export { registerUser, loginUser, logOutUser, userProfile }
