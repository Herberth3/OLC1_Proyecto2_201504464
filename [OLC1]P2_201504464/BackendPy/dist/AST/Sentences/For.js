"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class For extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param declaration Declaracion de la variable indice del ciclo for.
     * @param exp_Con Expresion que condiciona el recorrido del for.
     * @param exp_I_D Expresion que incrementa o decrementa el indice del for.
     * @param sentences_Cycle Sentencias que pueden ir dentro del for.
     * @param columna Columna donde se declara el ciclo for.
     */
    constructor(declaration, exp_Con, exp_I_D, sentences_Cycle, columna) {
        super(columna);
        this.declaracion = declaration;
        this.expresion_Condicion = exp_Con;
        this.expresion_Incre_Decre = exp_I_D;
        this.sentencias_Ciclo = sentences_Cycle;
    }
    traductorPY() {
        let forPY = "";
        return forPY;
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
exports.For = For;
