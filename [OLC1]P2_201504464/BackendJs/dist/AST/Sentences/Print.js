"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Print extends template_Instruccion_1.Template_Instruccion {
    constructor(exp, columna) {
        super(columna);
        this.expresion = exp;
    }
    traductorJS() {
        let printJS = "";
        printJS += this.calcularEspaciadoJS();
        printJS += "console.log(" + this.expresion.traductorJS() + ");\n";
        return printJS;
    }
    calcularEspaciadoJS() {
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
