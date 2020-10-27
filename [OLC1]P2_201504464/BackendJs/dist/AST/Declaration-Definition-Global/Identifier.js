"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Identifier extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param id Este identificador funciona para el arreglo de asignaciones dentro de una declaracion.
     */
    constructor(id) {
        super(1);
        this.identificador = id;
    }
    traductorJS() {
        return this.identificador;
    }
    calcularEspaciadoJS() {
        throw new Error("Method not implemented.");
    }
}
exports.Identifier = Identifier;
