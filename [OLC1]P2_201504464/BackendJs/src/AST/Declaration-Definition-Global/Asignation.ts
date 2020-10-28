import { Template_Instruccion } from "../template_Instruccion";

export class Asignation extends Template_Instruccion{
    
    identificador: string;
    expresion: Template_Instruccion;
    asignacion_Normal: boolean;

    /**
     * 
     * @param id Identificador de la asignacion.
     * @param exp Expresion de la asignacion.
     * @param asig_Norm Boolean, 'true' asignacion es normal - 'false' asignacion esta en arreglo de declaracion.
     * @param columna Columna donde esta localizada la asignacion.
     */

    constructor(id: string, exp: Template_Instruccion, asig_Norm: boolean, columna: number){
        super(columna);
        this.identificador = id;
        this.expresion = exp;
        this.asignacion_Normal = asig_Norm;
    }
    
    traductorJS(): string {

        let asignationJS:string = "";

        if (this.asignacion_Normal) {
            asignationJS = this.calcularEspaciadoJS() + this.identificador + " = " + this.expresion.traductorJS() + ";\n";
        } else {
            asignationJS = this.identificador + " = " + this.expresion.traductorJS();
        }

        return asignationJS;
    }
    
    calcularEspaciadoJS(): string {
        let espacios:string = "";

        let i:number = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }

        return espacios;
    }
}