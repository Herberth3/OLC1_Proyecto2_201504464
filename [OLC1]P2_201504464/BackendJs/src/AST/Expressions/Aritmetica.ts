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

}