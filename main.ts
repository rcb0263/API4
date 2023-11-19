import express from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import { getTardis, getDimension, getPlaneta, getPersona } from "./resolvers/get.ts";
import { postTardis, postDimension, postPlaneta, postPersona } from "./resolvers/post.ts";
import { putTardis, putDimension, putPlaneta, putPersona } from "./resolvers/put.ts";
import { deleteTardis, deleteDimension, deletePlaneta, deletePersona } from "./resolvers/delete.ts";
import getIntro from "./resolvers/getIntro.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
console.log(MONGO_URL)

if (!MONGO_URL) {
  console.log("debes especificar la variable de entorno de MONGO_URL");
  Deno.exit(1);
}

try {
  await mongoose.connect(MONGO_URL);
  console.log("Conexión hecha MongoDB");

  const app = express();
  app.use(express.json());

  app.get("/", getIntro)

  .get("/tardis/:id", getTardis)
  .get("/dimension/:id", getDimension)
  .get("/planeta/:id", getPlaneta)
  .get("/persona/:id", getPersona)

  .post("/tardis", postTardis)
  .post("/dimension", postDimension)
  .post("/planeta", postPlaneta)
  .post("/persona", postPersona)

  .put("/tardis/:id", putTardis)
  .put("/dimension/:id", putDimension)
  .put("/planeta/:id", putPlaneta)
  .put("/persona/:id", putPersona)

  .delete("/tardis/:id", deleteTardis)
  .delete("/dimension/:id", deleteDimension)
  .delete("/planeta/:id", deletePlaneta)
  .delete("/persona/:id", deletePersona)

  app.listen(3000, () => {
    console.log("Servidor levantado en el puerto 3000");
  });
  

} catch (e) {
  console.error(e);
}