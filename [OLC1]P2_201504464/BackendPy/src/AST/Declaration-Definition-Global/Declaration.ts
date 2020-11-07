import { Template_Instruccion } from "../template_Instruccion";

export class Declaration extends Template_Instruccion {

    tipo: string;
    identificadores: Array<Template_Instruccion>;

    /**
     * 
     * @param tipo Puede ser int, double, String, char, boolean.
     * @param ids Arreglo de asignaciones que se pueden hacer en la declaracion.
     * @param columna Columna donde se hace la declaracion.
     */

    constructor(tipo: string, ids: Array<Template_Instruccion>, columna: number) {
        super(columna);
        this.tipo = tipo;
        this.identificadores = ids;
    }

    traductorPY(): string {
        let id_AsignationPY: string = "";

        id_AsignationPY = this.calcularEspaciadoPY() + "var ";

        for (let i = 0; i < this.identificadores.length; i++) {
            const element = this.identificadores[i];

            if (i == this.identificadores.length - 1) {
                id_AsignationPY += element.traductorPY();
            } else {
                id_AsignationPY += element.traductorPY() + ", ";
            }
        }

        return id_AsignationPY + "\n\n";
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