"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class For extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param declaration Declaracion de la variable indice del ciclo for.
     * @param exp_Con Expresion que condiciona el recorrido del for.
     * @param exp_I_D Expresion que incrementa o decrementa el indice del for.
     * @param sentences_Cycle Sentencias que pueden ir dentro del for.
     * @param columna Columna donde se declara el ciclo for.
     */
    constructor(declaration, exp_Con, exp_I_D, sentences_Cycle, columna) {
        super(columna);
        this.declaracion = declaration;
        this.expresion_Condicion = exp_Con;
        this.expresion_Incre_Decre = exp_I_D;
        this.sentencias_Ciclo = sentences_Cycle;
    }
    traductorJS() {
        let forJS = "";
        /** SE LE QUITA EL ESPACIADO QUE TRAE LA DECLARACION AL INICIO CON EL METODO TRIM **/
        let declaracion_For = this.declaracion.traductorJS().trim();
        /** SE REEMPLAZAN LOS SALTOS DE LINEA QUE TRAE LA DECLARACION AL FINAL **/
        declaracion_For = declaracion_For.replace("\n", "");
        /** SE CONTRUYE EL CICLO FOR PARA EL LENGUAJE JAVASCRIPT **/
        forJS += this.calcularEspaciadoJS() + "for (" + declaracion_For + " ";
        forJS += this.expresion_Condicion.traductorJS() + "; ";
        forJS += this.expresion_Incre_Decre.traductorJS() + ") {\n";
        this.sentencias_Ciclo.forEach(element => {
            forJS += element.traductorJS();
        });
        return forJS + this.calcularEspaciadoJS() + "}\n\n";
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
        dot += nodoHijo + "[label=\"FOR\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        /** AHORA EL NODOPADRE_G ES EL NODO FOR **/
        nodoPadre_G = nodoHijo;
        /** RECOLECTAR DECLARATION **/
        dot += this.declaracion.recolectarDot(t_g);
        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"EXPRESION\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        /** RECOLECTAR EXP_CONDICION **/
        dot += this.expresion_Condicion.recolectarDot(t_g);
        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"EXPRESION\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        /** RECOLECTAR EXP_INCRE_DECRE **/
        dot += this.expresion_Incre_Decre.recolectarDot(t_g);
        /*********************** BLOQUE DE SENTENCIAS PARA EL CICLO FOR ******************************/
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
        /*********************** BLOQUE DE SENTENCIAS PARA EL CICLO FOR ******************************/
        return dot;
    }
    recolectorDotHijo(t_g, nodoPadre_G, nombreHijo) {
        throw new Error("Method not implemented.");
    }
}
exports.For = For;
