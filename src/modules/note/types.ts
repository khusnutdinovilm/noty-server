export interface INoteModel {
  _id: string;
  title: string;
  description: string;
  userId: string;
}

export interface INoteDto extends Omit<INoteModel, "_id"> {
  id: string;
}

export type CreateNotePayload = Pick<INoteModel, "title" | "description" | "userId">;

export type UpdateNotePayload = Pick<INoteModel, "title" | "description">;
