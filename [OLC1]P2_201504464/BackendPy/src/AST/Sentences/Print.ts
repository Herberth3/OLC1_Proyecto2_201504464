import { Template_Instruccion } from "../template_Instruccion";

export class Print extends Template_Instruccion {

    tipo: string;
    expresion: string;

    constructor(type: string, exp: string, columna: number) {
        super(columna);
        this.expresion = exp;
        this.tipo = type;
    }

    traductorPY(): string {
        let printPY: string = "";

        printPY += this.calcularEspaciadoPY();
        if (this.tipo == "println") {
            printPY += "print(" + this.expresion + ")\n";
        } else {
            printPY += "print(" + this.expresion + ", end=\"\")\n";
        }

        return printPY;
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