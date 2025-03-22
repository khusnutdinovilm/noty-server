import { Router } from "express";
import { body } from "express-validator";

import authMiddleware from "@middlewares/auth-middleware";
import authController from "@modules/auth/auth.controller";

const authRouter = Router();

authRouter.post(
  "/auth/register",
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 20 }),
  body("confirmPassword").custom((value, { req }) => value === req.body.password),
  authController.register
);

authRouter.get("/activate/:link", authController.activate);

authRouter.post(
  "/auth/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 20 }),
  authController.login
);

authRouter.post("/auth/logout", authMiddleware, authController.logout);

authRouter.get("/refresh", authMiddleware, authController.refresh);

export default authRouter;
