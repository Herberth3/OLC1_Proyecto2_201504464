import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class Asignation extends Template_Instruccion {

    identificador: string;
    expresion: Template_Instruccion;
    asignacion_Normal: boolean;

    /**
     * 
     * @param id Identificador de la asignacion.
     * @param exp Expresion de la asignacion.
     * @param asig_Norm Boolean, 'true' asignacion es normal - 'false' asignacion esta en arreglo de declaracion.
     * @param columna Columna donde esta localizada la asignacion.
     */

    constructor(id: string, exp: Template_Instruccion, asig_Norm: boolean, columna: number) {
        super(columna);
        this.identificador = id;
        this.expresion = exp;
        this.asignacion_Normal = asig_Norm;
    }

    traductorJS(): string {

        let asignationJS: string = "";

        if (this.asignacion_Normal) {
            asignationJS = this.calcularEspaciadoJS() + this.identificador + " = " + this.expresion.traductorJS() + ";\n\n";
        } else {
            asignationJS = this.identificador + " = " + this.expresion.traductorJS();
        }

        return asignationJS;
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
        let nodoPadre_G: string = "nodo" + t_g.id_Nodo;
        let nodoPadre_A: string = "";
        let nodoHijo: string = "";

        if (this.asignacion_Normal) {
            t_g.id_Nodo++;
            nodoHijo = "nodo" + t_g.id_Nodo;
            dot += nodoHijo + "[label=\"ASIGNATION\"]\n";
            dot += nodoPadre_G + " -> " + nodoHijo + "\n";

            /** AHORA EL NODOPADRE_G ES EL NODO ASIGNATION **/
            nodoPadre_G = nodoHijo;
        }

        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.identificador);

        t_g.id_Nodo++;
        nodoPadre_A = "nodo" + t_g.id_Nodo;
        dot += nodoPadre_A + "[label=\"EXPRESION\"]\n";

        dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";

        dot += this.expresion.recolectarDot(t_g);

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