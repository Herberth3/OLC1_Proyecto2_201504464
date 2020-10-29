"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Return_Continue_Break extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param sentence Sentencia, puede ser return, continue, break.
     * @param exp Expresion que puede retornar el return, puede venir sin expresion.
     * @param exist_Exp Booleano, 'true' existe expresion, 'false' no hay expresion.
     * @param columna Columna donde se declara la sentencia.
     */
    constructor(sentence, exp, exist_Exp, columna) {
        super(columna);
        this.sentencia = sentence;
        this.expresion = exp;
        this.existe_Expresion = exist_Exp;
    }
    traductorJS() {
        if (this.existe_Expresion) {
            return this.calcularEspaciadoJS() + this.sentencia + " " + this.expresion.traductorJS() + ";\n\n";
        }
        return this.calcularEspaciadoJS() + this.sentencia + ";\n\n";
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
exports.Return_Continue_Break = Return_Continue_Break;
