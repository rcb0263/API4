import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/Persona.ts";
import TardisModel from "../db/Tardis.ts";
import DimensionModel from "../db/Dimension.ts";
import PlanetaModel from "../db/Planeta.ts";

const deleteTardis = async (req: Request, res: Response) => {
    try{
    const { id } = req.params;

    if(!id){
        res.status(400).send("Faltan el id");
        return;
    }

    const tardis = await TardisModel.findByIdAndDelete(id).exec();

    if(!tardis){
        res.status(404).send("Tardis no encontrado");
        return;
    }

    if(tardis.id_dimensiones !== null){
        const idd = tardis.id_dimensiones;
    
          await Promise.all(idd.map(async (x) => {
            const dimension = await DimensionModel.findByIdAndDelete(x).exec();
            
            if(dimension && dimension.id_planetas !== null){
            const idp = dimension.id_planetas;
              await Promise.all(idp.map(async (y) => {
                const planeta = await PlanetaModel.findByIdAndDelete(y).exec();
                
                if(planeta && planeta.id_personas !== null ){
                  const ide = planeta.id_personas;
                  await Promise.all(ide.map(async (e) => {
                    await PersonaModel.findByIdAndDelete(e).exec();
                  }));
                }
              }));
            }
        }));
      
      }


    res.status(200).send("Tardis con id " + id + " ha sido destruida");

} catch (error) {
    res.status(500).send(error.message);
    return;
}
}

const deleteDimension = async (req: Request, res: Response) => {
    try{
    const { id } = req.params;

    if(!id){
        res.status(400).send("Faltan campos");
        return;
    }

    const dimension = await DimensionModel.findByIdAndDelete(id).exec();

    if(!dimension){
        res.status(404).send("Dimension no encontrada");
        return;
    }

    if(dimension.id_planetas !== null){
        const idp = dimension.id_planetas;
    
          await Promise.all(idp.map(async (e) => {
            const planeta = await PlanetaModel.findByIdAndDelete(e).exec();
            
            if(planeta && planeta.id_personas !== null){
              const ide = planeta.id_personas;
              await Promise.all(ide.map(async (x) => {
                await PersonaModel.findByIdAndDelete(x).exec();
              }));
                
            }
          }));
        }

    res.status(200).send("Dimension con id " + id + " ha sido destruida");

} catch (error) {
    res.status(500).send(error.message);
    return;
}
}

const deletePlaneta = async (req: Request, res: Response) => {
    try{
    const { id } = req.params;

    if(!id){
        res.status(400).send("Faltan campos");
        return;
    }

    const planeta = await PlanetaModel.findByIdAndDelete(id).exec();

    if(!planeta){
        res.status(404).send("Planeta no encontrado");
        return;
    }

    if(planeta.id_personas !== null){
        const personasIds = planeta.id_personas;
  
        await personasIds.forEach(async (e) => {
          await PersonaModel.findByIdAndDelete(e).exec();
        });
     }
     if(planeta.nombre === "Gallifrey"){
        res.status(200).send("Gallifrey ha caido");
     }else{

    res.status(200).send("Planeta con id " + id + " ha explotado");
     }
} catch (error) {
    res.status(500).send(error.message);
    return;
}
}

const deletePersona = async (req: Request, res: Response) => {
    try{
    const { id } = req.params;

    if(!id){
        res.status(400).send("Faltan campos");
        return;
    }

    const persona = await PersonaModel.findByIdAndDelete(id).exec();

    if(!persona){
        res.status(404).send("Persona no encontrado");
        return;
    }

    res.status(200).send("Persona con id " + id + " desaparecio de esta realidad");

} catch (error) {
    res.status(500).send(error.message);
    return;
}
}

export { deleteTardis, deleteDimension, deletePlaneta, deletePersona };