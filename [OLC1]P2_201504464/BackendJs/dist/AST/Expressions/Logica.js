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
    recolectarDot(t_g) {
        let dot = "";
        let nodoPadre_G = "nodo" + t_g.id_Nodo;
        let nodoPadre_A = "";
        let nodoHijo = "";
        switch (this.signo) {
            case Types_1.Type_Operation.AND:
                dot += this.recolectorDot_Operaciones(t_g, "AND");
                break;
            case Types_1.Type_Operation.OR:
                dot += this.recolectorDot_Operaciones(t_g, "OR");
                break;
            case Types_1.Type_Operation.XOR:
                dot += this.recolectorDot_Operaciones(t_g, "XOR");
                break;
            case Types_1.Type_Operation.NOT_UNARIO:
                dot += this.recolectorDotHijo(t_g, "", "!");
                nodoHijo = "nodo" + t_g.id_Nodo;
                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"NOT_UNARIO\"]\n";
                /** CONECTAR NODOPADRE_G -> NOT_UNARIO **/
                dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
                /** CONECTAR NOT_UNARIO -> - **/
                dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                /** RECOLECTAR EXP1 **/
                dot += this.expresion1.recolectarDot(t_g);
                break;
        }
        return dot;
    }
    recolectorDotHijo(t_g, nodoPadre_G, nombreHijo) {
        let dot = "";
        let nodoHijo = "";
        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"" + nombreHijo + "\"]\n";
        return dot;
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
exports.Logica = Logica;
