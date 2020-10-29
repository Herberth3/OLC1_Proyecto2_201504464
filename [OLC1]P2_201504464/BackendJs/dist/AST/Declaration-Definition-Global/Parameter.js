"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Parameter extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param tipo Tipo de primitivo, puede ser int, double, String, char, boolean.
     * @param id Identificador del parametro.
     */
    constructor(tipo, id) {
        super(1);
        this.tipo = tipo;
        this.identificador = id;
    }
    traductorJS() {
        return this.identificador;
    }
    calcularEspaciadoJS() {
        throw new Error("Method not implemented.");
    }
}
exports.Parameter = Parameter;
