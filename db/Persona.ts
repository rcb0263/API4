import mongoose from "npm:mongoose@7.6.3";
import { Persona } from "../types.ts";

const Schema = mongoose.Schema;

const PersonaSchema = new Schema(
    {
    nombre: { type: String, required: true },
    },
 );


export type PersonaModelType = mongoose.Document & Omit<Persona, "_id">;

export default mongoose.model<PersonaModelType>("personas", PersonaSchema); 