import noteRepository from "@modules/note/note.repository";
import { CreateNotePayload, INoteModel, UpdateNotePayload } from "@modules/note/types";

class NoteService {
  async getAllNotes(): Promise<INoteModel[]> {
    return await noteRepository.getAllNotes();
  }

  async getNotesByUserId(userId: string): Promise<INoteModel[]> {
    return await noteRepository.getNotesByUserId(userId);
  }

  async createNote(noteData: CreateNotePayload): Promise<INoteModel | null> {
    return await noteRepository.createNote(noteData);
  }

  async updateNote(noteId: string, noteData: UpdateNotePayload): Promise<INoteModel | null> {
    return await noteRepository.updateNote(noteId, noteData);
  }

  async deleteNote(noteId: string): Promise<INoteModel | null> {
    return await noteRepository.deleteNoteById(noteId);
  }
}

export default new NoteService();
