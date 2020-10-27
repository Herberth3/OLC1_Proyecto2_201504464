import { Template_Instruccion } from "../template_Instruccion";

export class Identifier extends Template_Instruccion{
    identificador: string;

    /**
     * 
     * @param id Este identificador funciona para el arreglo de asignaciones dentro de una declaracion.
     */

    constructor(id: string){
        super(1);
        this.identificador = id;
    }
    
    traductorJS(): string {
        return this.identificador;
    }
    
    calcularEspaciadoJS(): string {
        throw new Error("Method not implemented.");
    }
}