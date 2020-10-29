import { Template_Instruccion } from "../template_Instruccion";

export class Do_While extends Template_Instruccion{
    
    sentencias_Ciclo: Array<Template_Instruccion>;
    expresion_Condicion: Template_Instruccion;

    /**
     * 
     * @param exp_Con Expresion que condiciona el recorrido del do_while.
     * @param sentences_Cycle Sentencias que pueden ir dentro del do_while.
     * @param columna Columna donde se declara el ciclo do_while.
     */

    constructor(sentences_Cycle: Array<Template_Instruccion>, exp_Con: Template_Instruccion, columna:number){
        super(columna);
        this.sentencias_Ciclo = sentences_Cycle;
        this.expresion_Condicion = exp_Con;
    }
    
    traductorJS(): string {
        let do_whileJS: string = "";

        do_whileJS += this.calcularEspaciadoJS() + "do {\n";

        this.sentencias_Ciclo.forEach(element => {
            do_whileJS += element.traductorJS();
        });

        do_whileJS += this.calcularEspaciadoJS() + "}\n";
        do_whileJS += this.calcularEspaciadoJS() + "while (";
        do_whileJS += this.expresion_Condicion.traductorJS() + ");\n\n"

        return do_whileJS;
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