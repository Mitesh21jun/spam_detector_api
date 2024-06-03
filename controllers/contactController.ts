import { Request, Response } from "express";
import { Op } from "sequelize";
import Contact from "../models/contact";
import HttpStatus from "../constant/httpStatus";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constant/message";
import ApiResponse from "../handler/response";
interface RequestWithUser extends Request {
  user?: {
    userId: number;
  };
}
export const addContact = async (req: RequestWithUser, res: Response) => {
  const { name, phoneNumber, isSpam } = req.body;
  const userId = req.user?.userId;

  try {
    const contact = await Contact.create({
      name,
      phoneNumber,
      isSpam,
      userId,
    });

    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(true, contact, null, SUCCESS_MESSAGE.CONTACT_ADDED)
      );
  } catch (error: any) {
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json(new ApiResponse(false, null, error, error.message));
  }
};

export const searchByName = async (req: Request, res: Response) => {
  const { searchText } = req.query;
  try {
    const contact = await Contact.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `${searchText}%` } },
          { phoneNumber: { [Op.iLike]: `%${searchText}%` } },
        ],
      },
    });
    return res.status(HttpStatus.OK).json(new ApiResponse(true, contact, null));
  } catch (error: any) {
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json(new ApiResponse(false, null, error, error.message));
  }
};

export const checkSpam = async (req: Request, res: Response) => {
  const { phoneNumber } = req.query;

  try {
    const contact = await Contact.findOne({ where: { phoneNumber } });
    if (!contact) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(
          new ApiResponse(false, null, true, ERROR_MESSAGE.CONTACT_NOT_FOUND)
        );
    }
    const isSpammer = contact.isSpam
      ? SUCCESS_MESSAGE.IS_SPAMMER
      : SUCCESS_MESSAGE.NOT_SPAMMER;
    return res
      .status(HttpStatus.OK)
      .json(new ApiResponse(true, { spam: contact.isSpam }, null, isSpammer));
  } catch (error: any) {
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json(new ApiResponse(false, null, error, error.message));
  }
};
export const markAsSpam = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  try {
    const contact = await Contact.findOne({ where: { phoneNumber } });
    if (!contact) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(
          new ApiResponse(false, null, true, ERROR_MESSAGE.CONTACT_NOT_FOUND)
        );
    }

    contact.isSpam = true;
    await contact.save();

    return res.status(HttpStatus.OK).json(new ApiResponse(true, contact, null));
  } catch (error: any) {
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json(new ApiResponse(false, null, error, error.message));
  }
};
