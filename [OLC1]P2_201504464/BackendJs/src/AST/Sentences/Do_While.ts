import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class Do_While extends Template_Instruccion{
    
    sentencias_Ciclo: Array<Template_Instruccion>;
    expresion_Condicion: Template_Instruccion;

    /**
     * 
     * @param exp_Con Expresion que condiciona el recorrido del do_while.
     * @param sentences_Cycle Sentencias que pueden ir dentro del do_while.
     * @param columna Columna donde se declara el ciclo do_while.
     */

    constructor(sentences_Cycle: Array<Template_Instruccion>, exp_Con: Template_Instruccion, columna:number){
        super(columna);
        this.sentencias_Ciclo = sentences_Cycle;
        this.expresion_Condicion = exp_Con;
    }
    
    traductorJS(): string {
        let do_whileJS: string = "";

        do_whileJS += this.calcularEspaciadoJS() + "do {\n";

        this.sentencias_Ciclo.forEach(element => {
            do_whileJS += element.traductorJS();
        });

        do_whileJS += this.calcularEspaciadoJS() + "}\n";
        do_whileJS += this.calcularEspaciadoJS() + "while (";
        do_whileJS += this.expresion_Condicion.traductorJS() + ");\n\n"

        return do_whileJS;
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
        /*********************** BLOQUE DE SENTENCIAS PARA EL CICLO DO_WHILE ******************************/

        dot += this.recolectorDotHijo(t_g, nodoPadre_G, "EXPRESION");

        /** RECOLECTAR EXP_CONDICION **/
        dot += this.expresion_Condicion.recolectarDot(t_g);

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