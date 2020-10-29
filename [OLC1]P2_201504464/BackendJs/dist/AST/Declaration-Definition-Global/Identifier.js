"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
const Types_1 = require("../Types");
class Identifier extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param id Este identificador funciona para el arreglo de asignaciones dentro de una declaracion.
     * @param parameters    Arreglo de parametros en una llamada a metodo, puede ser null para los otros casos.
     * @param tipo  Tipo de ejecucion, puede ser un id, llamada metodo, pos incremento, pos decremento.
     * @param call_method_N Booleano, 'true' llamada metodo con punto y coma, 'false' llamada metodo sin punto y coma.
     * @param columna   Columna donde se encuentra el identificador.
     */
    constructor(id, parameters, tipo, call_method_N, columna) {
        super(columna);
        this.identificador = id;
        this.parametros = parameters;
        this.tipo_Ejecucion = tipo;
        this.llamada_Metodo_Normal = call_method_N;
    }
    traductorJS() {
        switch (this.tipo_Ejecucion) {
            case Types_1.Type_Operation.IDENTIFICADOR:
                return this.identificador;
            case Types_1.Type_Operation.LLAMADA_METODO:
                let llamada_M = "";
                if (this.llamada_Metodo_Normal) {
                    llamada_M = this.calcularEspaciadoJS() + this.identificador + "(";
                    for (let i = 0; i < this.parametros.length; i++) {
                        const element = this.parametros[i];
                        if (i == this.parametros.length - 1) {
                            llamada_M += element.traductorJS();
                        }
                        else {
                            llamada_M += element.traductorJS() + ", ";
                        }
                    }
                    llamada_M += ");\n\n";
                }
                else {
                    llamada_M = this.identificador + "(";
                    for (let i = 0; i < this.parametros.length; i++) {
                        const element = this.parametros[i];
                        if (i == this.parametros.length - 1) {
                            llamada_M += element.traductorJS();
                        }
                        else {
                            llamada_M += element.traductorJS() + ", ";
                        }
                    }
                    llamada_M += ")";
                }
                return llamada_M;
            case Types_1.Type_Operation.POS_DECREMENTO:
                return this.calcularEspaciadoJS() + this.identificador + "--;\n\n";
            case Types_1.Type_Operation.POS_INCREMENTO:
                return this.calcularEspaciadoJS() + this.identificador + "++;\n\n";
        }
    }
    calcularEspaciadoJS() {
        let espacios = "";
        let i = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }
        return espacios;
    }
}
exports.Identifier = Identifier;
