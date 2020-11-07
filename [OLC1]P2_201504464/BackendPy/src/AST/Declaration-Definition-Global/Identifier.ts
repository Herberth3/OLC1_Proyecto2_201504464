import { Template_Instruccion } from "../template_Instruccion";
import { Type_Operation } from "../Types";

export class Identifier extends Template_Instruccion {

    identificador: string;
    parametros: Array<Template_Instruccion>;
    tipo_Ejecucion: Type_Operation;
    llamada_Metodo_Normal: boolean;

    /**
     * 
     * @param id Este identificador funciona para el arreglo de asignaciones dentro de una declaracion.
     * @param parameters    Arreglo de parametros en una llamada a metodo, puede ser null para los otros casos.
     * @param tipo  Tipo de ejecucion, puede ser un id, llamada metodo, pos incremento, pos decremento.
     * @param call_method_N Booleano, 'true' llamada metodo con punto y coma, 'false' llamada metodo sin punto y coma.
     * @param columna   Columna donde se encuentra el identificador.
     */

    constructor(id: string, parameters: Array<Template_Instruccion>, tipo: Type_Operation, call_method_N: boolean, columna: number) {
        super(columna);
        this.identificador = id;
        this.parametros = parameters;
        this.tipo_Ejecucion = tipo;
        this.llamada_Metodo_Normal = call_method_N;
    }

    traductorPY(): string {
        switch (this.tipo_Ejecucion) {
            case Type_Operation.IDENTIFICADOR:
                return this.identificador;
            case Type_Operation.LLAMADA_METODO:
                let llamada_M = "";

                if (this.llamada_Metodo_Normal) {
                    llamada_M = this.calcularEspaciadoPY() + this.identificador + "(";

                    for (let i = 0; i < this.parametros.length; i++) {
                        const element = this.parametros[i];

                        if (i == this.parametros.length - 1) {
                            llamada_M += element.traductorPY();
                        } else {
                            llamada_M += element.traductorPY() + ", ";
                        }
                    }
                    llamada_M += ");\n\n";
                } else {
                    llamada_M = this.identificador + "(";

                    for (let i = 0; i < this.parametros.length; i++) {
                        const element = this.parametros[i];

                        if (i == this.parametros.length - 1) {
                            llamada_M += element.traductorPY();
                        } else {
                            llamada_M += element.traductorPY() + ", ";
                        }
                    }
                    llamada_M += ")";
                }
                return llamada_M;
            case Type_Operation.POS_DECREMENTO:
                return this.calcularEspaciadoPY() + this.identificador + " -= 1\n\n";
            case Type_Operation.POS_INCREMENTO:
                return this.calcularEspaciadoPY() + this.identificador + " += 1\n\n";
        }

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