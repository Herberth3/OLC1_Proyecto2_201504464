"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Method extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param modificador Alcance del metodo.
     * @param tipo Puede ser void, int, double, String, char, boolean.
     * @param id Nombre del metodo.
     * @param parameters Arreglo de parametros en un metodo, puede estar vacio.
     * @param sentences Arreglo de sentencias que pueden ir dentro de un metodo, declaraciones, asignaciones, for, if, while, etc.
     * @param columna Columna donde se declara el metodo.
     */
    constructor(modificador, tipo, id, parameters, sentences, columna) {
        super(columna);
        this.modificador = modificador;
        this.tipo = tipo;
        this.identificador = id;
        this.parametros = parameters;
        this.sentencias = sentences;
    }
    traductorPY() {
        let metodoPY = "";
        let finalMetodo = ":";
        /** SI ES NULL EL PUNTO Y COMA ES PARA EL METODO DE UNA INTERFAZ **/
        if (this.sentencias == null) {
            finalMetodo = ";";
        }
        metodoPY += this.calcularEspaciadoPY();
        if (this.identificador == "main") {
            metodoPY += "def " + this.identificador + "( ):\n";
        }
        else {
            metodoPY += "def " + this.identificador + "(";
            for (let i = 0; i < this.parametros.length; i++) {
                const element = this.parametros[i];
                if (i == this.parametros.length - 1) {
                    metodoPY += element.traductorPY();
                }
                else {
                    metodoPY += element.traductorPY() + ", ";
                }
            }
            metodoPY += ")" + finalMetodo + "\n";
        }
        /** SI ES NULL LA TRADUCCION ES PARA EL METODO DE UNA INTERFAZ **/
        if (this.sentencias != null) {
            this.sentencias.forEach(element => {
                metodoPY += element.traductorPY();
            });
            if (this.identificador == "main") {
                metodoPY += this.calcularEspaciadoPY() + "if__name__=\"__main__\":\n      main()\n";
            }
        }
        return metodoPY + "\n\n";
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
exports.Method = Method;
