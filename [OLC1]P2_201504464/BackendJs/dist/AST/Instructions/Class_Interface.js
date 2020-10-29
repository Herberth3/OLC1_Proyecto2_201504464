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
    traductorJS() {
        if (this.tipo == "class") {
            let declaration_gJS = this.calcularEspaciadoJS();
            declaration_gJS += this.tipo + " " + this.identificador + " {\n";
            declaration_gJS += "   " + "constructor(){\n   }\n\n";
            this.declaraciones_globales.forEach(element => {
                declaration_gJS += element.traductorJS();
            });
            return declaration_gJS + this.calcularEspaciadoJS() + "}";
        }
        return "";
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
exports.Class_Interface = Class_Interface;
