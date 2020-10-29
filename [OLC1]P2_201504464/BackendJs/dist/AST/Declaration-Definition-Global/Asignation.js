"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Asignation extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param id Identificador de la asignacion.
     * @param exp Expresion de la asignacion.
     * @param asig_Norm Boolean, 'true' asignacion es normal - 'false' asignacion esta en arreglo de declaracion.
     * @param columna Columna donde esta localizada la asignacion.
     */
    constructor(id, exp, asig_Norm, columna) {
        super(columna);
        this.identificador = id;
        this.expresion = exp;
        this.asignacion_Normal = asig_Norm;
    }
    traductorJS() {
        let asignationJS = "";
        if (this.asignacion_Normal) {
            asignationJS = this.calcularEspaciadoJS() + this.identificador + " = " + this.expresion.traductorJS() + ";\n\n";
        }
        else {
            asignationJS = this.identificador + " = " + this.expresion.traductorJS();
        }
        return asignationJS;
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
exports.Asignation = Asignation;
