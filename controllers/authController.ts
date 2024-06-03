import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";
import HttpStatus from "../constant/httpStatus";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constant/message";
import ApiResponse from "../handler/response";

dotenv.config();

const { JWT_SECRET } = process.env;

export const register = async (req: Request, res: Response) => {
  const { name, phoneNumber, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(true, user, null, SUCCESS_MESSAGE.REGISTER_SUCCESSFUL)
      );
  } catch (error: any) {
    console.log(error);
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json(new ApiResponse(false, null, error.message));
  }
};

export const login = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(new ApiResponse(false, null, ERROR_MESSAGE.USER_NOT_FOUND));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(false, null, ERROR_MESSAGE.INVALID_CREDENTIALS));
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!);
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(true, { token }, null, SUCCESS_MESSAGE.LOGIN_SUCCESSFUL)
      );
  } catch (error: any) {
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json(new ApiResponse(false, null, ERROR_MESSAGE.INVALID_CREDENTIALS));
  }
};
