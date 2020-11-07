import { Template_Instruccion } from "../template_Instruccion";

export class Method extends Template_Instruccion {

    modificador: string;
    tipo: string;
    identificador: string;
    parametros: Array<Template_Instruccion>;
    sentencias: Array<Template_Instruccion>;

    /**
     * 
     * @param modificador Alcance del metodo.
     * @param tipo Puede ser void, int, double, String, char, boolean.
     * @param id Nombre del metodo.
     * @param parameters Arreglo de parametros en un metodo, puede estar vacio.
     * @param sentences Arreglo de sentencias que pueden ir dentro de un metodo, declaraciones, asignaciones, for, if, while, etc.
     * @param columna Columna donde se declara el metodo.
     */

    constructor(modificador: string, tipo: string, id: string, parameters: Array<Template_Instruccion>, sentences: Array<Template_Instruccion>, columna: number) {
        super(columna);
        this.modificador = modificador;
        this.tipo = tipo;
        this.identificador = id;
        this.parametros = parameters;
        this.sentencias = sentences;
    }

    traductorPY(): string {
        let metodoPY: string = "";
        let finalMetodo: string = ":";

        /** SI ES NULL EL PUNTO Y COMA ES PARA EL METODO DE UNA INTERFAZ **/
        if (this.sentencias == null) {
            finalMetodo = ";";
        }

        metodoPY += this.calcularEspaciadoPY();

        if (this.identificador == "main") {
            metodoPY += "def " + this.identificador + "( ):\n";
        } else {
            metodoPY += "def " + this.identificador + "(";

            for (let i = 0; i < this.parametros.length; i++) {
                const element = this.parametros[i];

                if (i == this.parametros.length - 1) {
                    metodoPY += element.traductorPY();
                } else {
                    metodoPY += element.traductorPY() + ", ";
                }
            }
            metodoPY += ")"+ finalMetodo +"\n"
        }
        /** SI ES NULL LA TRADUCCION ES PARA EL METODO DE UNA INTERFAZ **/
        if(this.sentencias != null){

            this.sentencias.forEach(element => {
                metodoPY += element.traductorPY();
            });

            if(this.identificador == "main"){
                metodoPY += this.calcularEspaciadoPY() +"if__name__=\"__main__\":\n      main()\n";
            }
        }

        return metodoPY + "\n\n";
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