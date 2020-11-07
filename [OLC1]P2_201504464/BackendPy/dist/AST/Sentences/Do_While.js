"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Do_While extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param exp_Con Expresion que condiciona el recorrido del do_while.
     * @param sentences_Cycle Sentencias que pueden ir dentro del do_while.
     * @param columna Columna donde se declara el ciclo do_while.
     */
    constructor(sentences_Cycle, exp_Con, columna) {
        super(columna);
        this.sentencias_Ciclo = sentences_Cycle;
        this.expresion_Condicion = exp_Con;
    }
    traductorPY() {
        let do_whilePY = "";
        do_whilePY += this.calcularEspaciadoPY() + "do {\n";
        this.sentencias_Ciclo.forEach(element => {
            do_whilePY += element.traductorPY();
        });
        do_whilePY += this.calcularEspaciadoPY() + "}\n";
        do_whilePY += this.calcularEspaciadoPY() + "while (";
        do_whilePY += this.expresion_Condicion.traductorPY() + ");\n\n";
        return do_whilePY;
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
exports.Do_While = Do_While;
