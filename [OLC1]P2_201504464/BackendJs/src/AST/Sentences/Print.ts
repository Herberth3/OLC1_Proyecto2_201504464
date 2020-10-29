import { Template_Instruccion } from "../template_Instruccion";

export class Print extends Template_Instruccion{
    
    expresion: Template_Instruccion;

    constructor(exp:Template_Instruccion, columna:number){
        super(columna);
        this.expresion = exp;
    }
    
    traductorJS(): string {
        let printJS: string = "";

        printJS += this.calcularEspaciadoJS();
        printJS += "console.log(" + this.expresion.traductorJS() + ");\n";

        return printJS;
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