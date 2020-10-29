import { Template_Instruccion } from "../template_Instruccion";

export class For extends Template_Instruccion{
    
    declaracion: Template_Instruccion;
    expresion_Condicion: Template_Instruccion;
    expresion_Incre_Decre: Template_Instruccion;
    sentencias_Ciclo: Array<Template_Instruccion>;

    /**
     * 
     * @param declaration Declaracion de la variable indice del ciclo for.
     * @param exp_Con Expresion que condiciona el recorrido del for.
     * @param exp_I_D Expresion que incrementa o decrementa el indice del for.
     * @param sentences_Cycle Sentencias que pueden ir dentro del for.
     * @param columna Columna donde se declara el ciclo for.
     */

    constructor(declaration: Template_Instruccion, exp_Con: Template_Instruccion, exp_I_D: Template_Instruccion, sentences_Cycle: Array<Template_Instruccion>, columna:number){
        super(columna);
        this.declaracion = declaration;
        this.expresion_Condicion = exp_Con;
        this.expresion_Incre_Decre = exp_I_D;
        this.sentencias_Ciclo = sentences_Cycle;
    }
    
    traductorJS(): string {
        let forJS: string = "";

        /** SE LE QUITA EL ESPACIADO QUE TRAE LA DECLARACION AL INICIO CON EL METODO TRIM **/
        let declaracion_For = this.declaracion.traductorJS().trim();
        /** SE REEMPLAZAN LOS SALTOS DE LINEA QUE TRAE LA DECLARACION AL FINAL **/
        declaracion_For = declaracion_For.replace("\n", "");

        /** SE CONTRUYE EL CICLO FOR PARA EL LENGUAJE JAVASCRIPT **/
        forJS += this.calcularEspaciadoJS() + "for (" + declaracion_For + " ";
        forJS += this.expresion_Condicion.traductorJS() + "; ";
        forJS += this.expresion_Incre_Decre.traductorJS() + ") {\n";

        this.sentencias_Ciclo.forEach(element => {
            forJS += element.traductorJS();
        });

        return forJS + this.calcularEspaciadoJS() + "}\n\n";
    }

    calcularEspaciadoJS(): string {
        let espacios: string = "";

        let i: number = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }

        return espacios;
    }
    
}