import { NextFunction, Request, Response } from "express";

import { RoleType } from "@modules/role/types";
import { TokenPayload } from "@modules/token/types";
import ApiError from "@utils/api-error";

interface Req extends Request {
  user?: TokenPayload;
}

export default function (roles: RoleType[]) {
  return (req: Req, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return next(ApiError.UnauthorizedError());
      }

      if (!roles.includes(user.role)) {
        return next(ApiError.Forribiden());
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
