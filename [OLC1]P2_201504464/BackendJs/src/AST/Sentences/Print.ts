import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class Print extends Template_Instruccion {

    tipo: string;
    expresion: Template_Instruccion;

    constructor(type: string, exp: Template_Instruccion, columna: number) {
        super(columna);
        this.expresion = exp;
        this.tipo = type;
    }

    traductorJS(): string {
        let printJS: string = "";

        printJS += this.calcularEspaciadoJS();
        printJS += "console.log(" + this.expresion.traductorJS() + ");\n";

        return printJS;
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