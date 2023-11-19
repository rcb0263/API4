import mongoose from "npm:mongoose@7.6.3";
import { Planeta } from "../types.ts";

const Schema = mongoose.Schema;

const PlanetaSchema = new Schema(
    {
    nombre: { type: String, required: true },
    id_personas: [{ type: Schema.Types.ObjectId, ref: "personas" }]

    },
 );

 export type PlanetaModelType = mongoose.Document & Omit<Planeta, "_id">;
 
 export default mongoose.model<PlanetaModelType>("planetas", PlanetaSchema);