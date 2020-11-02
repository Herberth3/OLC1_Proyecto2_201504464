import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class Declaration extends Template_Instruccion {

    tipo: string;
    identificadores: Array<Template_Instruccion>;

    /**
     * 
     * @param tipo Puede ser int, double, String, char, boolean.
     * @param ids Arreglo de asignaciones que se pueden hacer en la declaracion.
     * @param columna Columna donde se hace la declaracion.
     */

    constructor(tipo: string, ids: Array<Template_Instruccion>, columna: number) {
        super(columna);
        this.tipo = tipo;
        this.identificadores = ids;
    }

    traductorJS(): string {
        let id_AsignationJS: string = this.calcularEspaciadoJS() + "var ";

        for (let i = 0; i < this.identificadores.length; i++) {
            const element = this.identificadores[i];

            if (i == this.identificadores.length - 1) {
                id_AsignationJS += element.traductorJS();
            } else {
                id_AsignationJS += element.traductorJS() + ", ";
            }
        }

        return id_AsignationJS + ";\n\n";
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
                } else {
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