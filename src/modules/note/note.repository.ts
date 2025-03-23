import noteModel from "@modules/note/note.model";
import { CreateNotePayload, INoteModel, UpdateNotePayload } from "@modules/note/types";

class NoteRepository {
  async getAllNotes(): Promise<INoteModel[]> {
    return await noteModel.find().lean();
  }

  async getNotesByUserId(userId: string): Promise<INoteModel[]> {
    return await noteModel.find({ userId }).lean();
  }

  async createNote(noteData: CreateNotePayload): Promise<INoteModel> {
    return await noteModel.create(noteData);
  }

  async updateNote(_id: string, noteData: UpdateNotePayload): Promise<INoteModel | null> {
    return await noteModel.findOneAndUpdate({ _id }, noteData).lean();
  }

  async deleteNoteById(_id: string): Promise<INoteModel | null> {
    return await noteModel.findOneAndDelete({ _id }).lean();
  }
}

export default new NoteRepository();
