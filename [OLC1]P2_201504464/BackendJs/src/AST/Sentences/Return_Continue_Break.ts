import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class Return_Continue_Break extends Template_Instruccion {

    sentencia: string;
    expresion: Template_Instruccion;
    existe_Expresion: boolean;

    /**
     * 
     * @param sentence Sentencia, puede ser return, continue, break.
     * @param exp Expresion que puede retornar el return, puede venir sin expresion.
     * @param exist_Exp Booleano, 'true' existe expresion, 'false' no hay expresion.
     * @param columna Columna donde se declara la sentencia.
     */

    constructor(sentence: string, exp: Template_Instruccion, exist_Exp: boolean, columna: number) {
        super(columna);
        this.sentencia = sentence;
        this.expresion = exp;
        this.existe_Expresion = exist_Exp;
    }

    traductorJS(): string {
        if (this.existe_Expresion) {
            return this.calcularEspaciadoJS() + this.sentencia + " " + this.expresion.traductorJS() + ";\n\n";
        }

        return this.calcularEspaciadoJS() + this.sentencia + ";\n\n";
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
        let nodoHijo: string = "";

        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        switch (this.sentencia) {
            case "return":
                dot += nodoHijo + "[label=\"RETURN\"]\n";
                break;
            case "continue":
                dot += nodoHijo + "[label=\"CONTINUE\"]\n";
                break;
            case "break":
                dot += nodoHijo + "[label=\"BREAK\"]\n";
                break;
        }
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";

        /** AHORA EL NODOPADRE_G ES UNO DE LOS NODOS ANTERIORES **/
        nodoPadre_G = nodoHijo;

        switch (this.sentencia) {
            case "return":

                dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.sentencia);

                if (this.existe_Expresion) {

                    dot += this.recolectorDotHijo(t_g, nodoPadre_G, "EXPRESION");

                    /** RECOLECTAR EXPRESION **/
                    dot += this.expresion.recolectarDot(t_g);
                }

                break;
            case "continue":

                dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.sentencia);

                break;
            case "break":

                dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.sentencia);

                break;
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