import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/Persona.ts";
import TardisModel from "../db/Tardis.ts";
import DimensionModel from "../db/Dimension.ts";
import PlanetaModel from "../db/Planeta.ts";

const getTardis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tardis = await TardisModel.findById(id).populate({path:"id_dimensiones",populate:{path:"id_planetas",populate:{path:"id_personas"}}}).exec();
    if(!tardis){
        res.status(404).send("Tardis perdida en tiempo");
        return;
      }
      res.status(200).send({
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
        });
    } catch(error){
        res.status(404).send(error.message);
             return;
         }
    
}

const getDimension = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const dimension = await DimensionModel.findById(id).populate({path:"id_planetas",populate:("id_personas")}).exec();
        if(!dimension){
            res.status(404).send("dimension no localizada");
            return;
        }
        res.status(200).send({ 
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
          });
        } catch(error){
            res.status(404).send(error.message);
                 return;
             }
        
    }

const getPlaneta = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;
    
        const planeta = await PlanetaModel.findById(id).populate("id_personas").exec();
        if(!planeta){
            res.status(404).send("planeta no encontrado");
            return;
        }
        res.status(200).send({
          id: planeta._id.toString(),
          nombre: planeta.nombre,
          personas: planeta.id_personas.map(personas => {
        return {
          id: personas._id.toString(),
          nombre: personas.nombre,
        }
      })
    });
        } catch(error){
            res.status(404).send(error.message);
                 return;
             }
        
    }

const getPersona = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const persona = await PersonaModel.findById(id).exec();
        if(!persona){
            res.status(404).send("persona no existe en este planeta o dimension");
            return;
        }
        res.status(200).send({
            id: persona._id.toString(),
            nombre: persona.nombre,
            });
        } catch(error){
            res.status(404).send(error.message);
                 return;
             }
        
    }

    export { getTardis, getDimension, getPlaneta, getPersona };