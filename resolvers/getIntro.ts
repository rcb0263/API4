import { Request, Response } from "npm:express@4.18.2"; 
import PersonaModel from "../db/Persona.ts";
import TardisModel from "../db/Tardis.ts";
import DimensionModel from "../db/Dimension.ts";
import PlanetaModel from "../db/Planeta.ts";

const getIntro = async (_req: Request, res: Response) => { 
  
    try {

    const json_tardis = {
        title: "Base de datos Gallifreyana de la Tardis",
        data: (await TardisModel.find()
            .select("_id camuflaje regeneracion anoActual id_dimensiones")
            .populate({ path: "id_dimensiones", populate: { path: "id_planetas", populate: { path: "id_personas" } } })
            .exec()
        ).map((tardis) => {
            return {
                id: tardis._id.toString(),
                camuflaje: tardis.camuflaje,
                regeneracion: tardis.regeneracion,
                anoActual: tardis.anoActual,
                dimensiones: tardis.id_dimensiones.map(dimensiones => {
                    return {
                        id: dimensiones._id.toString(),
                        nombre: dimensiones.nombre,
                        planetas: dimensiones.id_planetas.map(planetas => {
                            return {
                                id: planetas._id.toString(),
                                nombre: planetas.nombre,
                                personas: planetas.id_personas.map(personas => {
                                    return {
                                        id: personas._id.toString(),
                                        nombre: personas.nombre,
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
        )
    };
      
    
    const json_dimensiones = {
        title: "Datos Dimensionales",
        data: (await DimensionModel.find()
            .select("_id nombre id_planetas")
            .populate({ path: "id_planetas", populate: { path: "id_personas" } })
            .exec()
        ).map((dimension) => {
            return {
                id: dimension._id.toString(),
          nombre: dimension.nombre,
          planetas: dimension.id_planetas.map(planetas => { 
            return {
              id: planetas._id.toString(),
              nombre: planetas.nombre,
              personas: planetas.id_personas.map(personas => {
                return {
                  id: personas._id.toString(),
                  nombre: personas.nombre,
                  }
                })
              }
            })
            }
        }
        )
    };
        
    
    
    const json_planetas = {
        title: "Datos Planetarios",
        data: (await PlanetaModel.find()
            .select("_id nombre id_personas")
            .populate({ path: "id_personas" })
            .exec()
        ).map((planeta) => {
            return {
                id: planeta._id.toString(),
                nombre: planeta.nombre,
                personas: planeta.id_personas.map(personas => {
              return {
                id: personas._id.toString(),
                nombre: personas.nombre,
                    }
                })
            }
        })
    };
    
    const json_personas = {
        title: "Datos de Personas",
        data: (await PersonaModel.find()
            .select("_id nombre")
            .exec()
        ).map((persona) => {
            return {
                id: persona._id.toString(),
                nombre: persona.nombre,
                
            }
        })
    };        


    const html = `


    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <title>APSI_4</title>
            

    <title>Document</title>
    <style>
    body {
    font-family: sans-serif;
    }
    h1 {
    text-align: center;
    }
    h2 {
    text-align: center;
    }
    pre {
    background-color: #eee;
    border: 1px solid #999;
    padding: 10px;
    }
    </style>
    </head>
    <body>
    <h1>APSI_P4: Doctor Who</h1>
    


    <h2>${json_tardis.title}</h2>
    <pre>${JSON.stringify(json_tardis, null, 2)}</pre>
    <h2>${json_dimensiones.title}</h2>
    <pre>${JSON.stringify(json_dimensiones, null, 2)}</pre>
    <h2>${json_planetas.title}</h2>
    <pre>${JSON.stringify(json_planetas, null, 2)}</pre>
    <h2>${json_personas.title}</h2>
    <pre>${JSON.stringify(json_personas, null, 2)}</pre>
    </body>
    </html>

    `;

    res.status(200).send(html);

    } catch (error) {

        res.status(500).send(error.message); 

        return; 
    }
};

export default getIntro; 