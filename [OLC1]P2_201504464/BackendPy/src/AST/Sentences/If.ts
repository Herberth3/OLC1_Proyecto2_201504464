import { Template_Instruccion } from "../template_Instruccion";

export class If extends Template_Instruccion {

    expresion_Condicion: Template_Instruccion;
    sentencias_Ciclo1: Array<Template_Instruccion>;
    existe_Else: boolean;
    sentencias_Ciclo2: Array<Template_Instruccion>;
    existe_ElseIf: boolean;
    sentencia_If: Template_Instruccion;
    empieza_ElseIF: boolean;

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

    constructor(exp_Con: Template_Instruccion, sentences_Cycle1: Array<Template_Instruccion>, exist_Else: boolean,
        sentences_Cycle2: Array<Template_Instruccion>, exist_ElseIf: boolean, sentence_If: Template_Instruccion, begin_ElseIf: boolean, columna: number) {
        super(columna);
        this.expresion_Condicion = exp_Con;
        this.sentencias_Ciclo1 = sentences_Cycle1;
        this.existe_Else = exist_Else;
        this.sentencias_Ciclo2 = sentences_Cycle2;
        this.existe_ElseIf = exist_ElseIf;
        this.sentencia_If = sentence_If;
        this.empieza_ElseIF = begin_ElseIf;
    }

    traductorPY(): string {
        let ifPY: string = "";

        return ifPY;
    }

    calcularEspaciadoPY(): string {
        let espacios: string = "";

        let i: number = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }

        return espacios;
    }
}