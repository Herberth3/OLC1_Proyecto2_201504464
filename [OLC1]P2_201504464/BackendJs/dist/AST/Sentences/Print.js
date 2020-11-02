"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Print extends template_Instruccion_1.Template_Instruccion {
    constructor(type, exp, columna) {
        super(columna);
        this.expresion = exp;
        this.tipo = type;
    }
    traductorJS() {
        let printJS = "";
        printJS += this.calcularEspaciadoJS();
        printJS += "console.log(" + this.expresion.traductorJS() + ");\n";
        return printJS;
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
        let nodoPadre_G = "nodo" + t_g.id_Nodo;
        let nodoHijo = "";
        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        switch (this.tipo) {
            case "println":
                dot += nodoHijo + "[label=\"PRINTLN\"]\n";
                break;
            case "print":
                dot += nodoHijo + "[label=\"PRINT\"]\n";
                break;
        }
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        /** AHORA EL NODOPADRE_G ES UNO DE LOS NODOS ANTERIORES **/
        nodoPadre_G = nodoHijo;
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.tipo);
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, "EXPRESION");
        /** RECOLECTAR EXPRESION **/
        dot += this.expresion.recolectarDot(t_g);
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
exports.Print = Print;
