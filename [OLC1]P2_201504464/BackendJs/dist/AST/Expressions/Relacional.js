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
    recolectarDot(t_g) {
        let dot = "";
        switch (this.signo) {
            case Types_1.Type_Operation.DOBLE_IGUAL:
                dot += this.recolectorDot_Operaciones(t_g, "DOBLE_IGUAL");
                break;
            case Types_1.Type_Operation.DIFERENTE_DE:
                dot += this.recolectorDot_Operaciones(t_g, "DIFERENTE_DE");
                break;
            case Types_1.Type_Operation.MENOR_QUE:
                dot += this.recolectorDot_Operaciones(t_g, "MENOR_QUE");
                break;
            case Types_1.Type_Operation.MAYOR_QUE:
                dot += this.recolectorDot_Operaciones(t_g, "MAYOR_QUE");
                break;
            case Types_1.Type_Operation.MENOR_IGUAL_QUE:
                dot += this.recolectorDot_Operaciones(t_g, "MENOR_IGUAL_QUE");
                break;
            case Types_1.Type_Operation.MAYOR_IGUAL_QUE:
                dot += this.recolectorDot_Operaciones(t_g, "MAYOR_IGUAL_QUE");
                break;
        }
        return dot;
    }
    recolectorDotHijo(t_g, nodoPadre_G, nombreHijo) {
        throw new Error("Method not implemented.");
    }
    recolectorDot_Operaciones(t_g, tipo) {
        let dot = "";
        let nodoPadre_G = "nodo" + t_g.id_Nodo;
        let nodoPadre_A = "";
        let nodoHijo = "";
        t_g.id_Nodo++;
        nodoPadre_A = "nodo" + t_g.id_Nodo;
        dot += nodoPadre_A + "[label=\"EXP\"]\n";
        /** RECOLECTAR EXP1 **/
        dot += this.expresion1.recolectarDot(t_g);
        nodoHijo = nodoPadre_A;
        t_g.id_Nodo++;
        nodoPadre_A = "nodo" + t_g.id_Nodo;
        dot += nodoPadre_A + "[label=\"" + tipo + "\"]\n";
        /** CONECTAR NODOPADRE_G -> tipo **/
        dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
        /** CONECTAR tipo -> EXP **/
        dot += nodoPadre_A + " -> " + nodoHijo + "\n";
        /** RECOLECTAR EXP2 **/
        dot += this.expresion2.recolectarDot(t_g);
        return dot;
    }
}
exports.Relacional = Relacional;
