export type Tardis = {
    camuflaje: string;
    regeneracion: number;
    anoActual: number;
    id_dimensiones: Dimension[];
  }
  
  export type Dimension = {
    _id: string;
    nombre: string;
    id_planetas: Planeta[];
  };
  
  export type Planeta = {
    _id: string;
    nombre: string;
    id_personas: Persona[];
  };
  
  export type Persona = {
    nombre: string;
    _id: string;
  };