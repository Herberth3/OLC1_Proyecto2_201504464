"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
const Types_1 = require("../Types");
class Aritmetica extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param exp1 Valor izquierdo que puede ser de tipo id, double, int, boolean, String, char.
     * @param operador Operador entre expresiones, puede ser +, - , *, /, ()
     * @param exp2 Valor derecho que puede ser de tipo id, double, int, boolean, String, char.
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
                return this.expresion1.traductorJS() + " + " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.RESTA:
                return this.expresion1.traductorJS() + " - " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.MULTIPLICACION:
                return this.expresion1.traductorJS() + " * " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.DIVISION:
                return this.expresion1.traductorJS() + " / " + this.expresion2.traductorJS();
            case Types_1.Type_Operation.MENOS_UNARIO:
                return "-" + this.expresion1.traductorJS();
            case Types_1.Type_Operation.PARENTESIS:
                return "(" + this.expresion1.traductorJS() + ")";
            case Types_1.Type_Operation.POS_DECREMENTO:
                return this.expresion1.traductorJS() + "--";
            case Types_1.Type_Operation.POS_INCREMENTO:
                return this.expresion1.traductorJS() + "++";
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
        switch (this.operador) {
            case Types_1.Type_Operation.SUMA:
                dot += this.recolectorDot_Operaciones(t_g, "SUMA");
                break;
            case Types_1.Type_Operation.RESTA:
                dot += this.recolectorDot_Operaciones(t_g, "RESTA");
                break;
            case Types_1.Type_Operation.MULTIPLICACION:
                dot += this.recolectorDot_Operaciones(t_g, "POR");
                break;
            case Types_1.Type_Operation.DIVISION:
                dot += this.recolectorDot_Operaciones(t_g, "DIV");
                break;
            case Types_1.Type_Operation.MENOS_UNARIO:
                dot += this.recolectorDotHijo(t_g, "", "-");
                nodoHijo = "nodo" + t_g.id_Nodo;
                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"MENOS_UNARIO\"]\n";
                /** CONECTAR NODOPADRE_G -> MENOS_UNARIO **/
                dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
                /** CONECTAR MENOS_UNARIO -> - **/
                dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                /** RECOLECTAR EXP1 **/
                dot += this.expresion1.recolectarDot(t_g);
                break;
            case Types_1.Type_Operation.PARENTESIS:
                dot += this.recolectorDotHijo(t_g, "", "(");
                nodoHijo = "nodo" + t_g.id_Nodo;
                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"PARENTESIS\"]\n";
                /** CONECTAR NODOPADRE_G -> PARENTESIS **/
                dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
                /** CONECTAR PARENTESIS -> ( **/
                dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                /** RECOLECTAR EXP1 **/
                dot += this.expresion1.recolectarDot(t_g);
                dot += this.recolectorDotHijo(t_g, "", ")");
                nodoHijo = "nodo" + t_g.id_Nodo;
                /** CONECTAR PARENTESIS -> ) **/
                dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                break;
            case Types_1.Type_Operation.POS_DECREMENTO:
                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"POS_DECREMENTO\"]\n";
                /** CONECTAR NODOPADRE_G -> POS_DECREMENTO **/
                dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
                /** RECOLECTAR EXP1 **/
                dot += this.expresion1.recolectarDot(t_g);
                dot += this.recolectorDotHijo(t_g, "", "--");
                nodoHijo = "nodo" + t_g.id_Nodo;
                /** CONECTAR POS_DECREMENTO -> -- **/
                dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                break;
            case Types_1.Type_Operation.POS_INCREMENTO:
                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"POS_INCREMENTO\"]\n";
                /** CONECTAR NODOPADRE_G -> POS_INCREMENTO **/
                dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
                /** RECOLECTAR EXP1 **/
                dot += this.expresion1.recolectarDot(t_g);
                dot += this.recolectorDotHijo(t_g, "", "++");
                nodoHijo = "nodo" + t_g.id_Nodo;
                /** CONECTAR POS_INCREMENTO -> ++ **/
                dot += nodoPadre_A + " -> " + nodoHijo + "\n";
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
exports.Aritmetica = Aritmetica;
