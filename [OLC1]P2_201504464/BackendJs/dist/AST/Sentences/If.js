"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class If extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param exp_Con Expresion que condiciona la entrada al if.
     * @param sentences_Cycle1 Sentencias que pueden ir dentro del if.
     * @param exist_Else Booleano, 'true' existe bloque else, 'false' sin bloque else.
     * @param sentences_Cycle2 Sentencias que pueden ir dentro del else.
     * @param exist_ElseIf Booleano, 'true' existe sentencia if despues del else, 'false' no existe otro bloque if.
     * @param sentence_If Nueva sentencia If despues de la reservada else. -> else if(){}
     * @param begin_ElseIf Booleano, 'true' empieza el if con nueva estructura de espaciado, 'false' ya esta implementada el nuevo espaciado. Solo aplica para el 'else if'.
     * @param columna Columna donde se declara el if.
     */
    constructor(exp_Con, sentences_Cycle1, exist_Else, sentences_Cycle2, exist_ElseIf, sentence_If, begin_ElseIf, columna) {
        super(columna);
        this.expresion_Condicion = exp_Con;
        this.sentencias_Ciclo1 = sentences_Cycle1;
        this.existe_Else = exist_Else;
        this.sentencias_Ciclo2 = sentences_Cycle2;
        this.existe_ElseIf = exist_ElseIf;
        this.sentencia_If = sentence_If;
        this.empieza_ElseIF = begin_ElseIf;
    }
    traductorJS() {
        let ifJS = "";
        if (this.empieza_ElseIF) {
            ifJS += this.calcularEspaciadoJS() + "if (";
        }
        else {
            ifJS += "if (";
        }
        ifJS += this.expresion_Condicion.traductorJS() + ") {\n";
        this.sentencias_Ciclo1.forEach(element => {
            ifJS += element.traductorJS();
        });
        if (this.existe_Else || this.existe_ElseIf) {
            if (this.empieza_ElseIF) {
                ifJS += this.calcularEspaciadoJS() + "}";
            }
            else {
                ifJS += this.calcularEspaciadoJS().replace("      ", "") + "}";
            }
            if (this.existe_Else) {
                ifJS += "else {\n";
                this.sentencias_Ciclo2.forEach(element => {
                    ifJS += element.traductorJS();
                });
                if (this.empieza_ElseIF) {
                    ifJS += this.calcularEspaciadoJS() + "}\n\n";
                }
                else {
                    ifJS += this.calcularEspaciadoJS().replace("      ", "") + "}\n\n";
                }
            }
            if (this.existe_ElseIf) {
                ifJS += "else " + this.sentencia_If.traductorJS();
            }
        }
        else {
            if (this.empieza_ElseIF) {
                ifJS += this.calcularEspaciadoJS() + "}\n\n";
            }
            else {
                ifJS += this.calcularEspaciadoJS().replace("      ", "") + "}\n\n";
            }
        }
        return ifJS;
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
exports.If = If;
