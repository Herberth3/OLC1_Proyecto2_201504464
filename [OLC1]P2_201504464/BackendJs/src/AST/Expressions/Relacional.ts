import { Template_Instruccion } from "../template_Instruccion";
import { Type_Operation } from "../Types";

export class Relacional extends Template_Instruccion{
    
    expresion1: Template_Instruccion;
    expresion2: Template_Instruccion;
    signo: Type_Operation;

    /**
     * 
     * @param exp1 Valor izquierdo que puede ser de tipo id, double, int, boolean, String, char.
     * @param signo Signo relacional entre expresiones, puede ser ==, !=, <, >, <=, >= 
     * @param exp2 Valor derecho que puede ser de tipo id, double, int, boolean, String, char.
     */

    constructor(exp1: Template_Instruccion, signo: Type_Operation, exp2: Template_Instruccion){
        super(1);
        this.expresion1 = exp1;
        this.expresion2 = exp2;
        this.signo = signo;
    }
    
    traductorJS(): string {
        switch (this.signo) {
            case Type_Operation.DOBLE_IGUAL:
                return this.expresion1.traductorJS() + " == " + this.expresion2.traductorJS();
            case Type_Operation.DIFERENTE_DE:
                return this.expresion1.traductorJS() + " != " + this.expresion2.traductorJS();
            case Type_Operation.MENOR_QUE:
                return this.expresion1.traductorJS() + " < " + this.expresion2.traductorJS();
            case Type_Operation.MAYOR_QUE:
                return this.expresion1.traductorJS() + " > " + this.expresion2.traductorJS();
            case Type_Operation.MENOR_IGUAL_QUE:
                return this.expresion1.traductorJS() + " <= " + this.expresion2.traductorJS();
            case Type_Operation.MAYOR_IGUAL_QUE:
                return this.expresion1.traductorJS() + " >= " + this.expresion2.traductorJS();
            default:
                return "";
        }
    }
    calcularEspaciadoJS(): string {
        throw new Error("Method not implemented.");
    }
    
}