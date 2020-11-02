import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class While extends Template_Instruccion {

    expresion_Condicion: Template_Instruccion;
    sentencias_Ciclo: Array<Template_Instruccion>;

    /**
     * 
     * @param exp_Con Expresion que condiciona el recorrido del while.
     * @param sentences_Cycle Sentencias que pueden ir dentro del while.
     * @param columna Columna donde se declara el ciclo while.
     */

    constructor(exp_Con: Template_Instruccion, sentences_Cycle: Array<Template_Instruccion>, columna: number) {
        super(columna);
        this.expresion_Condicion = exp_Con;
        this.sentencias_Ciclo = sentences_Cycle;
    }

    traductorJS(): string {
        let whileJS: string = "";

        whileJS += this.calcularEspaciadoJS() + "while (";
        whileJS += this.expresion_Condicion.traductorJS() + ") {\n";

        this.sentencias_Ciclo.forEach(element => {
            whileJS += element.traductorJS();
        });

        return whileJS + this.calcularEspaciadoJS() + "}\n\n";
    }

    calcularEspaciadoJS(): string {
        let espacios: string = "";

        let i: number = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }

        return espacios;
    }

    recolectarDot(t_g: Template_Grafo): string {
        let dot: string = "";
        let esPrimero: boolean = true;
        let nodoPadre_G: string = "nodo" + t_g.id_Nodo;
        let nodoPadre_A: string = "";
        let nodoHijo: string = "";

        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"WHILE\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";

        /** AHORA EL NODOPADRE_G ES EL NODO WHILE **/
        nodoPadre_G = nodoHijo;

        dot += this.recolectorDotHijo(t_g, nodoPadre_G, "EXPRESION");

        /** RECOLECTAR EXP_CONDICION **/
        dot += this.expresion_Condicion.recolectarDot(t_g);

        /*********************** BLOQUE DE SENTENCIAS PARA EL CICLO WHILE ******************************/
        if (this.sentencias_Ciclo.length > 0) {

            this.sentencias_Ciclo.forEach(element => {

                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"LIST_BLOQUE_CICLO\"]\n";

                if (esPrimero) {
                    esPrimero = false;
                } else {
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
        /*********************** BLOQUE DE SENTENCIAS PARA EL CICLO WHILE ******************************/

        return dot;
    }

    recolectorDotHijo(t_g: Template_Grafo, nodoPadre_G: string, nombreHijo: string): string {
        let dot: string = "";
        let nodoHijo: string = "";

        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"" + nombreHijo + "\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";

        return dot;
    }
}