import { NextFunction, Request, Response } from "express";

import tokenService from "@modules/token/token.service";
import { TokenPayload } from "@modules/token/types";
import ApiError from "@utils/api-error";

interface Req extends Request {
  user?: TokenPayload;
}

export default function (req: Req, res: Response, next: NextFunction) {
  try {
    const authorizedHeader = req.headers.authorization;

    if (!authorizedHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizedHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw next(ApiError.UnauthorizedError());
    }

    req.user = userData;

    next();
  } catch (error) {
    return next(error);
  }
}
