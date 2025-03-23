import { Router } from "express";

import authMiddleware from "@middlewares/auth-middleware";

import noteController from "@modules/note/note.controller";

const noteRouter = Router();

noteRouter.get("/notes", authMiddleware, noteController.getNotes);
noteRouter.post("/notes", authMiddleware, noteController.createNote);
noteRouter.patch("/notes/:noteId", authMiddleware, noteController.updateNote);
noteRouter.delete("/notes/:noteId", authMiddleware, noteController.deleteNote);

export default noteRouter;
