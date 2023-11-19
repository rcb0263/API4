import { Request, Response } from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import PersonaModel from "../db/Persona.ts";
import TardisModel from "../db/Tardis.ts";
import DimensionModel from "../db/Dimension.ts";
import PlanetaModel from "../db/Planeta.ts";

const putTardis = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const {camuflaje, regeneracion, anoActual, dimension } = req.body;

        if(  !camuflaje || !regeneracion || !anoActual ||!dimension){
            res.status(400).send("Faltan campos");
            return;
        }

        const grupoDimensiones = await Promise.all(dimension.map(async (id: string) => {
            if(mongoose.Types.ObjectId.isValid(id)){
                const x = await DimensionModel.findById(id).exec(); 
                if (x) {
                    return {id: x._id.toString(), nombre: x.nombre};
      
                } else { 
                    res.status(400).send("dimension no encontrada"); 
                    return; 
                }
            }
            else{
                res.status(400).send("id no valido"); 
                return;
            }
        }));

        const newTardis = await TardisModel.findByIdAndUpdate(id, { camuflaje, regeneracion, anoActual,  id_dimensiones:dimension }, { new: true }).exec();

        if(!newTardis){
            res.status(404).send("Tardis perdida en el tiempo");
            return;
        }

        res.status(200).send({
            id: newTardis._id.toString(),
            camuflaje: newTardis.camuflaje,
            regeneracion: newTardis.regeneracion,
            anoActual: newTardis.anoActual,
            dimension: grupoDimensiones,
        });
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

const putDimension = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const { nombre, planeta } = req.body;

        if(!nombre || !planeta){
            res.status(400).send("Faltan campos");
            return;
        }

        const grupoPlanetas = await Promise.all(planeta.map(async (id: string) => {
            if(mongoose.Types.ObjectId.isValid(id)){
                const x = await PlanetaModel.findById(id).exec(); 
                if (x) {
                    return {id: x._id.toString(), nombre: x.nombre};
      
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

        const newDimension = await DimensionModel.findByIdAndUpdate(id, { nombre,id_planetas:planeta }, { new: true }).exec();

        if(!newDimension){
            res.status(404).send("dimension no encontrada");
            return;
        }

        res.status(200).send({
            id: newDimension._id.toString(),
            nombre: newDimension.nombre,
            planeta: grupoPlanetas,
        });

    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

const putPlaneta = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const { nombre, persona } = req.body;

        if(!nombre || !persona){
            res.status(400).send("Faltan campos");
            return;
        }

        const grupoPersonas = await Promise.all(persona.map(async (id: string) => {
            if(mongoose.Types.ObjectId.isValid(id)){
                const x = await PersonaModel.findById(id).exec();
                if (x) {
                    return {id: x._id.toString(), nombre: x.nombre};
                } else {
                    res.status(400).send("persona no existe en este planeta o dimension");
                    return;
                }
            }
            else{
                res.status(400).send("id no valido");
                return;
            }
        }));

        const newPlaneta = await PlanetaModel.findByIdAndUpdate(id, { nombre, id_personas:persona}, { new: true }).exec();

        if(!newPlaneta){
            res.status(404).send("planeta no encontrado");
            return;
        }

        res.status(200).send({
            id: newPlaneta._id.toString(),
            nombre: newPlaneta.nombre,
            personas: grupoPersonas,
        });

    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

const putPersona = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const { nombre } = req.body;

        if(!nombre){
            res.status(400).send("Faltan campos");
            return;
        }

        const newPersona = await PersonaModel.findByIdAndUpdate(id, { nombre }, { new: true }).exec();

        if(!newPersona){
            res.status(404).send("persona no existe en este planeta o dimension");
            return;
        }

        res.status(200).send({
            id: newPersona._id.toString(),
            nombre: newPersona.nombre,
        });

    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export { putTardis, putDimension, putPlaneta, putPersona };