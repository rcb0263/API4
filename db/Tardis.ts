import mongoose from "npm:mongoose@7.6.3";
import { Tardis } from "../types.ts";

const Schema = mongoose.Schema;

const TardisSchema = new Schema({
    camuflaje: String,
    regeneracion: Number,
    anoActual: Number,
    id_dimensiones: [{ type: Schema.Types.ObjectId, ref: "dimensiones" }]
  });

export type TardisModelType = mongoose.Document & Omit<Tardis, "_id">;

export default mongoose.model<TardisModelType>("tardis", TardisSchema);