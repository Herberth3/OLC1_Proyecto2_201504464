"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Class_Interface extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param modificador Alcance de la clase o interface.
     * @param tipo Puede ser una clase o una interface.
     * @param id Nombre de la clase o interface.
     * @param declaraciones_g Arreglo de declaraciones globales, declaraciones, asignaciones, metodos, incrementos, decrementos.
     * @param columna Columna donde se declara la clase o interface.
     */
    constructor(modificador, tipo, id, declaraciones_g, columna) {
        super(columna);
        this.modificador = modificador;
        this.tipo = tipo;
        this.identificador = id;
        this.declaraciones_globales = declaraciones_g;
    }
    traductorPY() {
        let declaration_gPY = "";
        declaration_gPY = this.calcularEspaciadoPY();
        declaration_gPY += this.tipo + " " + this.identificador + " :\n";
        this.declaraciones_globales.forEach(element => {
            declaration_gPY += element.traductorPY();
        });
        return declaration_gPY;
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
exports.Class_Interface = Class_Interface;
