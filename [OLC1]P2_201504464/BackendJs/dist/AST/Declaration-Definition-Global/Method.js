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
    traductorJS() {
        let metodoJS = "";
        metodoJS += this.calcularEspaciadoJS();
        if (this.identificador == "main") {
            metodoJS += "static " + this.identificador + "(args) {\n";
        }
        else {
            metodoJS += "function " + this.identificador + "(";
            for (let i = 0; i < this.parametros.length; i++) {
                const element = this.parametros[i];
                if (i == this.parametros.length - 1) {
                    metodoJS += element.traductorJS();
                }
                else {
                    metodoJS += element.traductorJS() + ", ";
                }
            }
            metodoJS += ") {\n";
        }
        this.sentencias.forEach(element => {
            metodoJS += element.traductorJS();
        });
        return metodoJS + this.calcularEspaciadoJS() + "}\n\n";
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
    recolectarDot(t_g) {
        let dot = "";
        let esPrimero = true;
        let nodoPadre_G = "nodo" + t_g.id_Nodo;
        let nodoPadre_A = "";
        let nodoHijo = "";
        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"METHOD\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        /** AHORA EL NODOPADRE_G ES EL NODO METHOD **/
        nodoPadre_G = nodoHijo;
        //dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.modificador);
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.tipo);
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.identificador);
        /*********************** BLOQUE DE PARAMETROS PARA LOS METODOS ******************************/
        if (this.identificador == "main") {
            t_g.id_Nodo++;
            nodoPadre_A = "nodo" + t_g.id_Nodo;
            dot += nodoPadre_A + "[label=\"LIST_PARAMETROS\"]\n";
            dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
            dot += this.recolectorDotHijo(t_g, nodoPadre_A, "String[]");
            dot += this.recolectorDotHijo(t_g, nodoPadre_A, "args");
        }
        else {
            if (this.parametros.length > 0) {
                this.parametros.forEach(element => {
                    t_g.id_Nodo++;
                    nodoPadre_A = "nodo" + t_g.id_Nodo;
                    dot += nodoPadre_A + "[label=\"LIST_PARAMETROS\"]\n";
                    if (esPrimero) {
                        dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
                        esPrimero = false;
                    }
                    else {
                        dot += nodoHijo + " -> " + nodoPadre_A + "\n";
                    }
                    dot += element.recolectarDot(t_g);
                    nodoHijo = nodoPadre_A;
                });
            }
        }
        /*********************** BLOQUE DE PARAMETROS PARA LOS METODOS ******************************/
        /*********************** BLOQUE DE SENTENCIAS PARA LOS METODOS ******************************/
        if (this.sentencias != null) {
            if (this.sentencias.length > 0) {
                esPrimero = true;
                this.sentencias.forEach(element => {
                    t_g.id_Nodo++;
                    nodoPadre_A = "nodo" + t_g.id_Nodo;
                    dot += nodoPadre_A + "[label=\"LIST_SENTENCIAS\"]\n";
                    if (esPrimero) {
                        esPrimero = false;
                    }
                    else {
                        dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                    }
                    t_g.id_Nodo++;
                    nodoHijo = "nodo" + t_g.id_Nodo;
                    dot += nodoHijo + "[label=\"SENTENCIAS\"]\n";
                    dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                    dot += element.recolectarDot(t_g);
                    nodoHijo = nodoPadre_A;
                });
                dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
            }
        }
        /*********************** BLOQUE DE SENTENCIAS PARA LOS METODOS ******************************/
        return dot;
    }
    recolectorDotHijo(t_g, nodoPadre_G, nombreHijo) {
        let dot = "";
        let nodoHijo = "";
        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"" + nombreHijo + "\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        return dot;
    }
}
exports.Method = Method;
