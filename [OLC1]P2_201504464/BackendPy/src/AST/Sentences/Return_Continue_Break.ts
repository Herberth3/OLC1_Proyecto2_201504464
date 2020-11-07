import { Template_Instruccion } from "../template_Instruccion";

export class Return_Continue_Break extends Template_Instruccion {

    sentencia: string;
    expresion: string;
    existe_Expresion: boolean;

    /**
     * 
     * @param sentence Sentencia, puede ser return, continue, break.
     * @param exp Expresion que puede retornar el return, puede venir sin expresion.
     * @param exist_Exp Booleano, 'true' existe expresion, 'false' no hay expresion.
     * @param columna Columna donde se declara la sentencia.
     */

    constructor(sentence: string, exp: string, exist_Exp: boolean, columna: number) {
        super(columna);
        this.sentencia = sentence;
        this.expresion = exp;
        this.existe_Expresion = exist_Exp;
    }

    traductorPY(): string {
        if (this.existe_Expresion) {
            return this.calcularEspaciadoPY() + this.sentencia + " " + this.expresion + "\n\n";
        }

        return this.calcularEspaciadoPY() + this.sentencia + "\n\n";
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