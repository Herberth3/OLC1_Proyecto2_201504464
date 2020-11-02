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
    recolectarDot(t_g) {
        let dot = "";
        let nodoPadre_G = "nodo" + t_g.id_Nodo;
        let nodoHijo = "";
        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"PRIMITIVO\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        /** AHORA EL NODOPADRE_G ES EL NODO PRIMITIVO **/
        nodoPadre_G = nodoHijo;
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.valor);
        return dot;
    }
    recolectorDotHijo(t_g, nodoPadre_G, nombreHijo) {
        let dot = "";
        let nodoHijo = "";
        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        if (this.valor[0] == '\"') {
            const re = /\"/gi;
            dot += nodoHijo + "[label=\"\\\"" + nombreHijo.replace(re, '') + "\\\"\"]\n";
        }
        else {
            dot += nodoHijo + "[label=\"" + nombreHijo + "\"]\n";
        }
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        return dot;
    }
}
exports.Primitivo = Primitivo;
