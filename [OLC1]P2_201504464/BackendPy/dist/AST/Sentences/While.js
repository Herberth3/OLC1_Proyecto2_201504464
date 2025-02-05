"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class While extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param exp_Con Expresion que condiciona el recorrido del while.
     * @param sentences_Cycle Sentencias que pueden ir dentro del while.
     * @param columna Columna donde se declara el ciclo while.
     */
    constructor(exp_Con, sentences_Cycle, columna) {
        super(columna);
        this.expresion_Condicion = exp_Con;
        this.sentencias_Ciclo = sentences_Cycle;
    }
    traductorPY() {
        let whilePY = "";
        whilePY += this.calcularEspaciadoPY() + "while ";
        whilePY += this.expresion_Condicion + ":\n";
        this.sentencias_Ciclo.forEach(element => {
            whilePY += element.traductorPY();
        });
        return whilePY + "\n\n";
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
exports.While = While;
