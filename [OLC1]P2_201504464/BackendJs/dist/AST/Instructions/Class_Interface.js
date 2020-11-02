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
    recolectarDot(t_g) {
        let dot = "";
        let esPrimero = true;
        let nodoPadre_G = "nodo" + t_g.id_Nodo;
        let nodoPadre_A = "";
        let nodoHijo = "";
        //dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.modificador);
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.tipo);
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.identificador);
        if (this.declaraciones_globales.length > 0) {
            this.declaraciones_globales.forEach(element => {
                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"LIST_DECLARATION_GLOBAL\"]\n";
                if (esPrimero) {
                    esPrimero = false;
                }
                else {
                    dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                }
                t_g.id_Nodo++;
                nodoHijo = "nodo" + t_g.id_Nodo;
                dot += nodoHijo + "[label=\"DECLARATION_GLOBAL\"]\n";
                dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                dot += element.recolectarDot(t_g);
                nodoHijo = nodoPadre_A;
            });
            dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
        }
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
exports.Class_Interface = Class_Interface;
