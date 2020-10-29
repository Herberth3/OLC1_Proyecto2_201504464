"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
const Types_1 = require("../Types");
class Relacional extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param exp1 Valor izquierdo que puede ser de tipo id, double, int, boolean, String, char.
     * @param signo Signo relacional entre expresiones, puede ser ==, !=, <, >, <=, >=
     * @param exp2 Valor derecho que puede ser de tipo id, double, int, boolean, String, char.
     */
    constructor(exp1, signo, exp2) {
        super(1);
        this.expresion1 = exp1;
        this.expresion2 = exp2;
        this.signo = signo;
    }
    traductorJS() {
        switch (this.signo) {
            case Types_1.Type_Operation.DOBLE_IGUAL:
                return this.expresion1.traductorJS() + " == " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.DIFERENTE_DE:
                return this.expresion1.traductorJS() + " != " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.MENOR_QUE:
                return this.expresion1.traductorJS() + " < " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.MAYOR_QUE:
                return this.expresion1.traductorJS() + " > " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.MENOR_IGUAL_QUE:
                return this.expresion1.traductorJS() + " <= " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.MAYOR_IGUAL_QUE:
                return this.expresion1.traductorJS() + " >= " + this.expresion2.traductorJS();
            default:
                return "";
        }
    }
    calcularEspaciadoJS() {
        throw new Error("Method not implemented.");
    }
}
exports.Relacional = Relacional;
