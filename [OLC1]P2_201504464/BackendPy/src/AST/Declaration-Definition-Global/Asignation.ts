import { Template_Instruccion } from "../template_Instruccion";

export class Asignation extends Template_Instruccion {

    identificador: string;
    expresion: string;
    asignacion_Normal: boolean;

    /**
     * 
     * @param id Identificador de la asignacion.
     * @param exp Expresion de la asignacion.
     * @param asig_Norm Boolean, 'true' asignacion es normal - 'false' asignacion esta en arreglo de declaracion.
     * @param columna Columna donde esta localizada la asignacion.
     */

    constructor(id: string, exp:string, asig_Norm: boolean, columna: number) {
        super(columna);
        this.identificador = id;
        this.expresion = exp;
        this.asignacion_Normal = asig_Norm;
    }

    traductorPY(): string {

        let asignationPY: string = "";

        if (this.asignacion_Normal) {
            asignationPY = this.calcularEspaciadoPY() + this.identificador + " = " + this.expresion + "\n\n";
        } else {
            asignationPY = this.identificador + " = " + this.expresion;
        }

        return asignationPY;
    }

    calcularEspaciadoPY(): string {
        let espacios: string = "";

        let i: number = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }

        return espacios;
    }
}