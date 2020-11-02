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
    traductorJS() {
        let id_AsignationJS = this.calcularEspaciadoJS() + "var ";
        for (let i = 0; i < this.identificadores.length; i++) {
            const element = this.identificadores[i];
            if (i == this.identificadores.length - 1) {
                id_AsignationJS += element.traductorJS();
            }
            else {
                id_AsignationJS += element.traductorJS() + ", ";
            }
        }
        return id_AsignationJS + ";\n\n";
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
        dot += nodoHijo + "[label=\"DECLARATION\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        /** AHORA EL NODOPADRE_G ES EL NODO DECLARATION **/
        nodoPadre_G = nodoHijo;
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.tipo);
        if (this.identificadores.length > 0) {
            this.identificadores.forEach(element => {
                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"LIST_DECLA_ASIGN\"]\n";
                if (esPrimero) {
                    esPrimero = false;
                }
                else {
                    dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                }
                t_g.id_Nodo++;
                nodoHijo = "nodo" + t_g.id_Nodo;
                dot += nodoHijo + "[label=\"DECLA_ASIGN\"]\n";
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
exports.Declaration = Declaration;
