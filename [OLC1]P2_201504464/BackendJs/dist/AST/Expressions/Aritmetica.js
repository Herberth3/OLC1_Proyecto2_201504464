"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
const Types_1 = require("../Types");
class Aritmetica extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param exp1 Valor izquierdo que puede ser un id, double, int, boolean, String, char.
     * @param operador Operador entre expresiones, puede ser +, - , *, /, ()
     * @param exp2 Valor derecho que puede ser un id, double, int, boolean, String, char.
     */
    constructor(exp1, operador, exp2) {
        super(1);
        this.expresion1 = exp1;
        this.expresion2 = exp2;
        this.operador = operador;
    }
    traductorJS() {
        switch (this.operador) {
            case Types_1.Type_Operation.SUMA:
                return this.expresion1.traductorJS() + "+" + this.expresion2.traductorJS();
            case Types_1.Type_Operation.RESTA:
                return this.expresion1.traductorJS() + "-" + this.expresion2.traductorJS();
            case Types_1.Type_Operation.MULTIPLICACION:
                return this.expresion1.traductorJS() + "*" + this.expresion2.traductorJS();
            case Types_1.Type_Operation.DIVISION:
                return this.expresion1.traductorJS() + "/" + this.expresion2.traductorJS();
            case Types_1.Type_Operation.MENOS_UNARIO:
                return "-" + this.expresion1.traductorJS();
            case Types_1.Type_Operation.PARENTESIS:
                return "(" + this.expresion1.traductorJS() + ")";
            default:
                return "";
        }
    }
    calcularEspaciadoJS() {
        throw new Error("Method not implemented.");
    }
}
exports.Aritmetica = Aritmetica;
