"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Primitivo extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param valor Valor que contiene el primitivo a operar.
     */
    constructor(valor) {
        super(1);
        this.valor = valor;
    }
    traductorJS() {
        return this.valor;
    }
    calcularEspaciadoJS() {
        throw new Error("Method not implemented.");
    }
}
exports.Primitivo = Primitivo;
