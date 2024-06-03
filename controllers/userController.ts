// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/user";
import HttpStatus from "../constant/httpStatus";
import { SUCCESS_MESSAGE } from "../constant/message";
import ApiResponse from "../handler/response";

interface RequestWithUser extends Request {
  user?: {
    userId: number;
  };
}

export const getUser = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res
      .status(HttpStatus.BAD_REQUEST)
      .json(
        new ApiResponse(false, null, null, SUCCESS_MESSAGE.LOGIN_SUCCESSFUL)
      );    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(
          new ApiResponse(false, null, null, SUCCESS_MESSAGE.LOGIN_SUCCESSFUL)
        );
    }

    return res
    .status(HttpStatus.OK)
    .json(
      new ApiResponse(true, user, null)
    );
  } catch (error: any) {
    return res
    .status(HttpStatus.SERVER_ERROR)
    .json(
      new ApiResponse(false, null, error, error.message)
    );
  }
};
