import { Template_Instruccion } from "../template_Instruccion";

export class While extends Template_Instruccion {

    expresion_Condicion: string;
    sentencias_Ciclo: Array<Template_Instruccion>;

    /**
     * 
     * @param exp_Con Expresion que condiciona el recorrido del while.
     * @param sentences_Cycle Sentencias que pueden ir dentro del while.
     * @param columna Columna donde se declara el ciclo while.
     */

    constructor(exp_Con: string, sentences_Cycle: Array<Template_Instruccion>, columna: number) {
        super(columna);
        this.expresion_Condicion = exp_Con;
        this.sentencias_Ciclo = sentences_Cycle;
    }

    traductorPY(): string {
        let whilePY: string = "";

        whilePY += this.calcularEspaciadoPY() + "while ";
        whilePY += this.expresion_Condicion + ":\n";

        this.sentencias_Ciclo.forEach(element => {
            whilePY += element.traductorPY();
        });

        return whilePY + "\n\n";
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