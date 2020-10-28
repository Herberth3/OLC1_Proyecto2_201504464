import { Template_Instruccion } from "../template_Instruccion";

export class Primitivo extends Template_Instruccion{
    
    valor:any;

    /**
     * 
     * @param valor Valor que contiene el primitivo a operar.
     */

    constructor(valor:any){
        super(1);
        this.valor = valor;
    }
    
    traductorJS(): string {
        return this.valor;
    }

    calcularEspaciadoJS(): string {
        throw new Error("Method not implemented.");
    }
    
}