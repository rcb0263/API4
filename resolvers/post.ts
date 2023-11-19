import { Request, Response } from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import PersonaModel from "../db/Persona.ts";
import TardisModel from "../db/Tardis.ts";
import DimensionModel from "../db/Dimension.ts";
import PlanetaModel from "../db/Planeta.ts";

const postTardis = async (req: Request, res: Response) => {
    try{
        const {camuflaje, regeneracion, anoActual, dimension } = req.body;

        if(  !camuflaje || !regeneracion || !anoActual ||!dimension){
            res.status(400).send("Faltan campos");
            return;
        }

        const grupoDimensiones = await Promise.all(dimension.map(async (id: string) => {
            if(mongoose.Types.ObjectId.isValid(id)){
                const aux = await DimensionModel.findById(id).exec(); 
                if (aux) {
                    return {id: aux._id.toString(), nombre: aux.nombre};
      
                } else { 
                    res.status(400).send("dimensiones no encontrado"); 
                    return; 
                }
            }
            else{
                res.status(400).send("id no valido"); 
                return;
            }
        }));

        const tardis = new TardisModel({ camuflaje, regeneracion, anoActual,  id_dimensiones:dimension });
        const newTardis = await tardis.save();

        res.status(200).send({
            id: newTardis._id.toString(),
            dimension: grupoDimensiones,
            camuflaje: newTardis.camuflaje,
            regeneracion: newTardis.regeneracion,
            anoActual: newTardis.anoActual,
        });
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

const postDimension = async (req: Request, res: Response) => {
    try{
        const { nombre, planeta } = req.body;

        if(!nombre || !planeta){
            res.status(400).send("Faltan campos");
            return;
        }

        const grupoPlanetas = await Promise.all(planeta.map(async (id: string) => {
            if(mongoose.Types.ObjectId.isValid(id)){
                const aux = await PlanetaModel.findById(id).exec(); 
                if (aux) {
                    return {id: aux._id.toString(), nombre: aux.nombre}; 
      
                } else { 
                    res.status(400).send("planeta no encontrado"); 
                    return; 
                }
            }
            else{
                res.status(400).send("id no valido"); 
                return; 
            }
        }));
        const dimension = new DimensionModel({ nombre, id_planetas:planeta });
        const newDimension = await dimension.save();

        res.status(200).send({
            nombre: newDimension.nombre,
            planeta: grupoPlanetas,
            id: newDimension._id.toString(),
        });

    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

const postPlaneta = async (req: Request, res: Response) => {
    try{
        const { nombre, persona } = req.body;

        if(!nombre || !persona){
            res.status(400).send("Faltan campos");
            return;
        }

        const grupoPersonas = await Promise.all(persona.map(async (id: string) => {
            if(mongoose.Types.ObjectId.isValid(id)){
                const aux = await PersonaModel.findById(id).exec();
                if (aux) {
                    return {id: aux._id.toString(), nombre: aux.nombre};
                } else {
                    res.status(400).send("personas no encontrada");
                    return;
                }
            }
            else{
                res.status(400).send("id no valido");
                return;
            }
        }));

        const planeta = new PlanetaModel({ nombre, id_personas:persona });
        const newPlaneta = await planeta.save();

        res.status(200).send({
            nombre: newPlaneta.nombre,
            persona: grupoPersonas,
            id: newPlaneta._id.toString(),
        });

    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

const postPersona = async (req: Request, res: Response) => {
    try{
        const { nombre } = req.body;

        if(!nombre){
            res.status(400).send("Faltan campos");
            return;
        }

        const persona = new PersonaModel({ nombre });
        const newPersona = await persona.save();

        res.status(200).send({
            nombre: newPersona.nombre,
            id: newPersona._id.toString(),
        });

    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export { postTardis, postDimension, postPlaneta, postPersona };