import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class For extends Template_Instruccion{
    
    declaracion: Template_Instruccion;
    expresion_Condicion: Template_Instruccion;
    expresion_Incre_Decre: Template_Instruccion;
    sentencias_Ciclo: Array<Template_Instruccion>;

    /**
     * 
     * @param declaration Declaracion de la variable indice del ciclo for.
     * @param exp_Con Expresion que condiciona el recorrido del for.
     * @param exp_I_D Expresion que incrementa o decrementa el indice del for.
     * @param sentences_Cycle Sentencias que pueden ir dentro del for.
     * @param columna Columna donde se declara el ciclo for.
     */

    constructor(declaration: Template_Instruccion, exp_Con: Template_Instruccion, exp_I_D: Template_Instruccion, sentences_Cycle: Array<Template_Instruccion>, columna:number){
        super(columna);
        this.declaracion = declaration;
        this.expresion_Condicion = exp_Con;
        this.expresion_Incre_Decre = exp_I_D;
        this.sentencias_Ciclo = sentences_Cycle;
    }
    
    traductorJS(): string {
        let forJS: string = "";

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
        /*********************** BLOQUE DE SENTENCIAS PARA EL CICLO FOR ******************************/

        return dot;
    }

    recolectorDotHijo(t_g: Template_Grafo, nodoPadre_G: string, nombreHijo: string): string {
        throw new Error("Method not implemented.");
    }
}