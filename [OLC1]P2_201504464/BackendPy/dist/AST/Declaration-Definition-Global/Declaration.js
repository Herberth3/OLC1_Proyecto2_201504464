"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Declaration extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param tipo Puede ser int, double, String, char, boolean.
     * @param ids Arreglo de asignaciones que se pueden hacer en la declaracion.
     * @param columna Columna donde se hace la declaracion.
     */
    constructor(tipo, ids, columna) {
        super(columna);
        this.tipo = tipo;
        this.identificadores = ids;
    }
    traductorPY() {
        let id_AsignationPY = "";
        id_AsignationPY = this.calcularEspaciadoPY() + "var ";
        for (let i = 0; i < this.identificadores.length; i++) {
            const element = this.identificadores[i];
            if (i == this.identificadores.length - 1) {
                id_AsignationPY += element.traductorPY();
            }
            else {
                id_AsignationPY += element.traductorPY() + ", ";
            }
        }
        return id_AsignationPY + "\n\n";
    }
    calcularEspaciadoPY() {
        let espacios = "";
        let i = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }
        return espacios;
    }
}
exports.Declaration = Declaration;
