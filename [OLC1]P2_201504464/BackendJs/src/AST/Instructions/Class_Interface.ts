import { Template_Instruccion } from "../template_Instruccion";

export class Class_Interface extends Template_Instruccion{
    modificador: string;
    tipo: string;
    identificador: string;
    declaraciones_globales: Array<Template_Instruccion>;

    /**
     * 
     * @param modificador Alcance de la clase o interface.
     * @param tipo Puede ser una clase o una interface.
     * @param id Nombre de la clase o interface.
     * @param columna Columna donde se declara la clase o interface.
     */

    constructor(modificador:string, tipo: string, id: string, declaraciones_g: Array<Template_Instruccion>, columna: number){
        super(columna);
        this.modificador = modificador;
        this.tipo = tipo;
        this.identificador = id;
        this.declaraciones_globales = declaraciones_g;
    }

    traductorJS(): string {

        let declaration_gJS:string = this.calcularEspaciadoJS();
        declaration_gJS += this.tipo + " " + this.identificador + " {\n";

        this.declaraciones_globales.forEach(element => {
            declaration_gJS += element.traductorJS();
        });
        return declaration_gJS + "}";
    }

    calcularEspaciadoJS(): string {

        let espacios:string = "";

        let i:number = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }

        return espacios;
    }
    
}