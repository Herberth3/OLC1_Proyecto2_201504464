import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";
import { Type_Operation } from "../Types";

export class Aritmetica extends Template_Instruccion {

    expresion1: Template_Instruccion;
    expresion2: Template_Instruccion;
    operador: Type_Operation;

    /**
     * 
     * @param exp1 Valor izquierdo que puede ser de tipo id, double, int, boolean, String, char.
     * @param operador Operador entre expresiones, puede ser +, - , *, /, () 
     * @param exp2 Valor derecho que puede ser de tipo id, double, int, boolean, String, char.
     */

    constructor(exp1: Template_Instruccion, operador: Type_Operation, exp2: Template_Instruccion) {
        super(1);
        this.expresion1 = exp1;
        this.expresion2 = exp2;
        this.operador = operador;
    }

    traductorJS(): string {

        switch (this.operador) {
            case Type_Operation.SUMA:
                return this.expresion1.traductorJS() + " + " + this.expresion2.traductorJS();
            case Type_Operation.RESTA:
                return this.expresion1.traductorJS() + " - " + this.expresion2.traductorJS();
            case Type_Operation.MULTIPLICACION:
                return this.expresion1.traductorJS() + " * " + this.expresion2.traductorJS();
            case Type_Operation.DIVISION:
                return this.expresion1.traductorJS() + " / " + this.expresion2.traductorJS();
            case Type_Operation.MENOS_UNARIO:
                return "-" + this.expresion1.traductorJS();
            case Type_Operation.PARENTESIS:
                return "(" + this.expresion1.traductorJS() + ")";
            case Type_Operation.POS_DECREMENTO:
                return this.expresion1.traductorJS() + "--";
            case Type_Operation.POS_INCREMENTO:
                return this.expresion1.traductorJS() + "++";
            default:
                return "";
        }
    }

    calcularEspaciadoJS(): string {
        throw new Error("Method not implemented.");
    }

    recolectarDot(t_g: Template_Grafo): string {
        let dot: string = "";
        let nodoPadre_G: string = "nodo" + t_g.id_Nodo;
        let nodoPadre_A: string = "";
        let nodoHijo: string = "";

        switch (this.operador) {
            case Type_Operation.SUMA:

                dot += this.recolectorDot_Operaciones(t_g, "SUMA");

                break;
            case Type_Operation.RESTA:

                dot += this.recolectorDot_Operaciones(t_g, "RESTA");

                break;
            case Type_Operation.MULTIPLICACION:

                dot += this.recolectorDot_Operaciones(t_g, "POR");

                break;
            case Type_Operation.DIVISION:
                
                dot += this.recolectorDot_Operaciones(t_g, "DIV");

                break;
            case Type_Operation.MENOS_UNARIO:
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
            case Type_Operation.PARENTESIS:
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
            case Type_Operation.POS_DECREMENTO:
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
            case Type_Operation.POS_INCREMENTO:
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

    recolectorDotHijo(t_g: Template_Grafo, nodoPadre_G: string, nombreHijo: string): string {
        let dot: string = "";
        let nodoHijo: string = "";

        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"" + nombreHijo + "\"]\n";

        return dot;
    }

    recolectorDot_Operaciones(t_g: Template_Grafo, tipo: string): string {
        let dot: string = "";
        let nodoPadre_G: string = "nodo" + t_g.id_Nodo;
        let nodoPadre_A: string = "";
        let nodoHijo: string = "";

        t_g.id_Nodo++;
        nodoPadre_A = "nodo" + t_g.id_Nodo;
        dot += nodoPadre_A + "[label=\"EXP\"]\n";

        /** RECOLECTAR EXP1 **/
        dot += this.expresion1.recolectarDot(t_g);

        nodoHijo = nodoPadre_A;

        t_g.id_Nodo++;
        nodoPadre_A = "nodo" + t_g.id_Nodo;
        dot += nodoPadre_A + "[label=\""+ tipo +"\"]\n";

        /** CONECTAR NODOPADRE_G -> tipo **/
        dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
        /** CONECTAR tipo -> EXP **/
        dot += nodoPadre_A + " -> " + nodoHijo + "\n";

        /** RECOLECTAR EXP2 **/
        dot += this.expresion2.recolectarDot(t_g);

        return dot;
    }
}