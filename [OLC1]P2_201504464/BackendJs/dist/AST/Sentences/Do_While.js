"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class Do_While extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param exp_Con Expresion que condiciona el recorrido del do_while.
     * @param sentences_Cycle Sentencias que pueden ir dentro del do_while.
     * @param columna Columna donde se declara el ciclo do_while.
     */
    constructor(sentences_Cycle, exp_Con, columna) {
        super(columna);
        this.sentencias_Ciclo = sentences_Cycle;
        this.expresion_Condicion = exp_Con;
    }
    traductorJS() {
        let do_whileJS = "";
        do_whileJS += this.calcularEspaciadoJS() + "do {\n";
        this.sentencias_Ciclo.forEach(element => {
            do_whileJS += element.traductorJS();
        });
        do_whileJS += this.calcularEspaciadoJS() + "}\n";
        do_whileJS += this.calcularEspaciadoJS() + "while (";
        do_whileJS += this.expresion_Condicion.traductorJS() + ");\n\n";
        return do_whileJS;
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
        dot += nodoHijo + "[label=\"DO_WHILE\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        /** AHORA EL NODOPADRE_G ES EL NODO DO_WHILE **/
        nodoPadre_G = nodoHijo;
        /*********************** BLOQUE DE SENTENCIAS PARA EL CICLO DO_WHILE ******************************/
        if (this.sentencias_Ciclo.length > 0) {
            this.sentencias_Ciclo.forEach(element => {
                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"LIST_BLOQUE_CICLO\"]\n";
                if (esPrimero) {
                    esPrimero = false;
                }
                else {
                    dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                }
                t_g.id_Nodo++;
                nodoHijo = "nodo" + t_g.id_Nodo;
                dot += nodoHijo + "[label=\"SENTENCIAS_CICLO\"]\n";
                dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                dot += element.recolectarDot(t_g);
                nodoHijo = nodoPadre_A;
            });
            dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
        }
        /*********************** BLOQUE DE SENTENCIAS PARA EL CICLO DO_WHILE ******************************/
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, "EXPRESION");
        /** RECOLECTAR EXP_CONDICION **/
        dot += this.expresion_Condicion.recolectarDot(t_g);
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
exports.Do_While = Do_While;
