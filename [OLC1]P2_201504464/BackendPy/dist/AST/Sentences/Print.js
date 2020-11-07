"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Print extends template_Instruccion_1.Template_Instruccion {
    constructor(type, exp, columna) {
        super(columna);
        this.expresion = exp;
        this.tipo = type;
    }
    traductorPY() {
        let printPY = "";
        printPY += this.calcularEspaciadoPY();
        if (this.tipo == "println") {
            printPY += "print(" + this.expresion + ")\n";
        }
        else {
            printPY += "print(" + this.expresion + ", end=\"\")\n";
        }
        return printPY;
    }
    calcularEspaciadoPY() {
        let espacios = "";
        let i = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }
        return espacios;
    }
}
exports.Print = Print;
