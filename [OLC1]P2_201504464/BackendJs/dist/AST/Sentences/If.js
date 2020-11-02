"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
class If extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param exp_Con Expresion que condiciona la entrada al if.
     * @param sentences_Cycle1 Sentencias que pueden ir dentro del if.
     * @param exist_Else Booleano, 'true' existe bloque else, 'false' sin bloque else.
     * @param sentences_Cycle2 Sentencias que pueden ir dentro del else.
     * @param exist_ElseIf Booleano, 'true' existe sentencia if despues del else, 'false' no existe otro bloque if.
     * @param sentence_If Nueva sentencia If despues de la reservada else. -> else if(){}
     * @param begin_ElseIf Booleano, 'true' empieza el if con nueva estructura de espaciado, 'false' ya esta implementada el nuevo espaciado. Solo aplica para el 'else if'.
     * @param columna Columna donde se declara el if.
     */
    constructor(exp_Con, sentences_Cycle1, exist_Else, sentences_Cycle2, exist_ElseIf, sentence_If, begin_ElseIf, columna) {
        super(columna);
        this.expresion_Condicion = exp_Con;
        this.sentencias_Ciclo1 = sentences_Cycle1;
        this.existe_Else = exist_Else;
        this.sentencias_Ciclo2 = sentences_Cycle2;
        this.existe_ElseIf = exist_ElseIf;
        this.sentencia_If = sentence_If;
        this.empieza_ElseIF = begin_ElseIf;
    }
    traductorJS() {
        let ifJS = "";
        if (this.empieza_ElseIF) {
            ifJS += this.calcularEspaciadoJS() + "if (";
        }
        else {
            ifJS += "if (";
        }
        ifJS += this.expresion_Condicion.traductorJS() + ") {\n";
        this.sentencias_Ciclo1.forEach(element => {
            ifJS += element.traductorJS();
        });
        if (this.existe_Else || this.existe_ElseIf) {
            if (this.empieza_ElseIF) {
                ifJS += this.calcularEspaciadoJS() + "}";
            }
            else {
                ifJS += this.calcularEspaciadoJS().replace("      ", "") + "}";
            }
            if (this.existe_Else) {
                ifJS += "else {\n";
                this.sentencias_Ciclo2.forEach(element => {
                    ifJS += element.traductorJS();
                });
                if (this.empieza_ElseIF) {
                    ifJS += this.calcularEspaciadoJS() + "}\n\n";
                }
                else {
                    ifJS += this.calcularEspaciadoJS().replace("      ", "") + "}\n\n";
                }
            }
            if (this.existe_ElseIf) {
                ifJS += "else " + this.sentencia_If.traductorJS();
            }
        }
        else {
            if (this.empieza_ElseIF) {
                ifJS += this.calcularEspaciadoJS() + "}\n\n";
            }
            else {
                ifJS += this.calcularEspaciadoJS().replace("      ", "") + "}\n\n";
            }
        }
        return ifJS;
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
        dot += nodoHijo + "[label=\"IF\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        /** AHORA EL NODOPADRE_G ES EL NODO IF **/
        nodoPadre_G = nodoHijo;
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, "EXPRESION");
        /** RECOLECTAR EXPRESION **/
        dot += this.expresion_Condicion.recolectarDot(t_g);
        /*********************** BLOQUE DE SENTENCIAS PARA EL IF ******************************/
        if (this.sentencias_Ciclo1.length > 0) {
            this.sentencias_Ciclo1.forEach(element => {
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
        /*********************** BLOQUE DE SENTENCIAS PARA EL IF ******************************/
        if (this.existe_Else) {
            dot += this.recolectorDotHijo(t_g, nodoPadre_G, "ELSE");
            /** AHORA EL NODOPADRE_G ES EL NODO ELSE **/
            nodoPadre_G = "nodo" + t_g.id_Nodo;
            esPrimero = true;
            /*********************** BLOQUE DE SENTENCIAS PARA EL ELSE ******************************/
            if (this.sentencias_Ciclo2.length > 0) {
                this.sentencias_Ciclo2.forEach(element => {
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
            /*********************** BLOQUE DE SENTENCIAS PARA EL ELSE ******************************/
        }
        if (this.existe_ElseIf) {
            dot += this.recolectorDotHijo(t_g, nodoPadre_G, "ELSE");
            /** RECOLECTAR SENTENCIA ELSE_IF **/
            dot += this.sentencia_If.recolectarDot(t_g);
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
exports.If = If;
