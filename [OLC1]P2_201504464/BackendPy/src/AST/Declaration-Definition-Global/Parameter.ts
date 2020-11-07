import { Template_Instruccion } from "../template_Instruccion";

export class Parameter extends Template_Instruccion{
    
    tipo: string;
    identificador: string;

    /**
     * 
     * @param tipo Tipo de primitivo, puede ser int, double, String, char, boolean.
     * @param id Identificador del parametro.
     */

    constructor(tipo: string, id: string){
        super(1);
        this.tipo = tipo;
        this.identificador = id;
    }

    traductorPY(): string {
        return this.identificador;
    }
    calcularEspaciadoPY(): string {
        throw new Error("Method not implemented.");
    }    
}