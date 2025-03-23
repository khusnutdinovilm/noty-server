import { NextFunction, Request, Response } from "express";

import noteService from "@modules/note/note.service";
import { TokenPayload } from "@modules/token/types";
import ApiError from "@utils/api-error";

interface Req extends Request {
  user?: TokenPayload;
}

class NoteController {
  async getNotes(req: Req, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw ApiError.UnauthorizedError();
      }

      if (user.role === "admin") {
        const notes = await noteService.getAllNotes();
        res.status(200).json(notes);
      } else if (user.role === "user") {
        const userNotes = await noteService.getNotesByUserId(user.id);
        res.status(200).json(userNotes);
      }
    } catch (error) {
      next(error);
    }
  }

  async createNote(req: Req, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) {
        throw ApiError.UnauthorizedError();
      }
      const { id: userId } = user;
      const createNotePayload = {
        ...req.body,
        userId,
      };

      const newNote = await noteService.createNote(createNotePayload);
      if (!newNote) {
        throw new Error("Пошла какая-то хуйня");
      }

      res.status(200).json(newNote);
    } catch (error) {
      next(error);
    }
  }

  async updateNote(req: Request, res: Response, next: NextFunction) {
    try {
      const { noteId } = req.params;
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req: Request, res: Response, next: NextFunction) {
    try {
      const { noteId } = req.params;
    } catch (error) {
      next(error);
    }
  }
}

export default new NoteController();
