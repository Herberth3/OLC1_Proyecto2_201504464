import { Template_Instruccion } from "../template_Instruccion";

export class Declaration extends Template_Instruccion{
    tipo: string;
    identificadores: Array<Template_Instruccion>;

    /**
     * 
     * @param tipo Puede ser int, double, String, char, boolean.
     * @param ids Arreglo de asignaciones que se pueden hacer en la declaracion.
     * @param columna Columna donde se hace la declaracion.
     */

    constructor(tipo: string, ids: Array<Template_Instruccion>, columna: number){
        super(columna);
        this.tipo = tipo;
        this.identificadores = ids;
    }
    
    traductorJS(): string {
        let id_AsignationJS:string = this.calcularEspaciadoJS() + "var ";

        for (let i = 0; i < this.identificadores.length; i++) {
            const element = this.identificadores[i];
            
            if (i == this.identificadores.length - 1) {
                id_AsignationJS += element.traductorJS();
            } else {
                id_AsignationJS += element.traductorJS() + ", ";
            }
        }

        return id_AsignationJS + ";\n\n";
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