import { Template_Instruccion } from "../template_Instruccion";

export class Method extends Template_Instruccion{
    
    modificador: string;
    tipo: string;
    identificador: string;
    parametros: Array<Template_Instruccion>;
    sentencias: Array<Template_Instruccion>;

    /**
     * 
     * @param modificador Alcance de la clase o interface.
     * @param tipo Puede ser una clase o una interface.
     * @param id Nombre de la clase o interface.
     * @param parameters Arreglo de parametros en un metodo, puede estar vacio.
     * @param sentences Arreglo de sentencias que pueden ir dentro de un metodo, declaraciones, asignaciones, for, if, while, etc.
     * @param columna Columna donde se declara el metodo.
     */

    constructor(modificador: string, tipo: string, id: string, parameters: Array<Template_Instruccion>, sentences: Array<Template_Instruccion>, columna: number){
        super(columna);
        this.modificador = modificador;
        this.tipo = tipo;
        this.identificador = id;
        this.parametros = parameters;
        this.sentencias = sentences;
    }
    
    traductorJS(): string {
        let metodoJS:string = "";
        metodoJS += this.calcularEspaciadoJS();

        if (this.identificador == "main") {
            metodoJS += "static " + this.identificador + "(args) {\n";
        } else {
            metodoJS += "function " + this.identificador + "(";
            
            for (let i = 0; i < this.parametros.length; i++) {
                const element = this.parametros[i];

                if (i == this.parametros.length - 1) {
                    metodoJS += element.traductorJS();
                } else {
                    metodoJS += element.traductorJS() + ", ";
                }
            }
            metodoJS += ") {\n"
        }

        this.sentencias.forEach(element => {
            metodoJS += element.traductorJS();
        });

        return metodoJS + this.calcularEspaciadoJS() + "}\n\n";
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