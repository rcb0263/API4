import mongoose from "npm:mongoose@7.6.3";
import { Dimension } from "../types.ts";

const Schema = mongoose.Schema;

const DimensionSchema = new Schema(
    {
    nombre: { type: String, required: true },
    id_planetas: [{ type: Schema.Types.ObjectId, ref: "planetas" }]

    },
 );

export type DimensionModelType = mongoose.Document & Omit<Dimension, "_id">;

export default mongoose.model<DimensionModelType>("dimensiones", DimensionSchema);