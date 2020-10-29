"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
const Types_1 = require("../Types");
class Logica extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param exp1 Valor izquierdo que puede ser de tipo id, double, int, boolean, String, char.
     * @param signo Signo relacional entre expresiones, puede ser &&, ||, ^, !
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
            case Types_1.Type_Operation.AND:
                return this.expresion1.traductorJS() + " && " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.OR:
                return this.expresion1.traductorJS() + " || " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.XOR:
                return this.expresion1.traductorJS() + " ^ " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.NOT_UNARIO:
                return "!" + this.expresion1.traductorJS();
            default:
                return "";
        }
    }
    calcularEspaciadoJS() {
        throw new Error("Method not implemented.");
    }
}
exports.Logica = Logica;
