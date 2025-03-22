import { NextFunction, Request, Response } from "express";

import authService from "@modules/auth/auth.service";
import { ILoginPayload, IRegisterPayload } from "@modules/auth/types";
import tokenService from "@modules/token/token.service";
import ApiError from "@utils/api-error";
import { validationResult } from "express-validator";

class AuthController {
  async register(req: Request<{}, {}, IRegisterPayload>, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
      }

      const registerPayload = req.body;
      await authService.register(registerPayload);

      res.status(200).json({
        message: "Пользователь успешно создан",
      });
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request<{ link: string }>, res: Response, next: NextFunction) {
    try {
      const link = req.params.link;
      await authService.activate(link);
      const redirectUrl = `${process.env.CLIENT_URL}/auth/login`;
      res.redirect(redirectUrl);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request<{}, {}, ILoginPayload>, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
      }

      const loginPayload = req.body;
      const loginData = await authService.login(loginPayload);

      res.cookie("refreshToken", loginData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      res.status(200).json(loginData);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await tokenService.deleteTokenByRefresh(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
