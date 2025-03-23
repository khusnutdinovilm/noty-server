import { model, Schema } from "mongoose";

import { INoteModel } from "@modules/note/types";

const NoteSchema = new Schema<INoteModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" },
});

const noteModel = model("Note", NoteSchema);

export default noteModel;
