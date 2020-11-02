import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class Class_Interface extends Template_Instruccion {

    modificador: string;
    tipo: string;
    identificador: string;
    declaraciones_globales: Array<Template_Instruccion>;

    /**
     * 
     * @param modificador Alcance de la clase o interface.
     * @param tipo Puede ser una clase o una interface.
     * @param id Nombre de la clase o interface.
     * @param declaraciones_g Arreglo de declaraciones globales, declaraciones, asignaciones, metodos, incrementos, decrementos.
     * @param columna Columna donde se declara la clase o interface.
     */

    constructor(modificador: string, tipo: string, id: string, declaraciones_g: Array<Template_Instruccion>, columna: number) {
        super(columna);
        this.modificador = modificador;
        this.tipo = tipo;
        this.identificador = id;
        this.declaraciones_globales = declaraciones_g;
    }

    traductorJS(): string {

        if (this.tipo == "class") {
            let declaration_gJS: string = this.calcularEspaciadoJS();
            declaration_gJS += this.tipo + " " + this.identificador + " {\n";
            declaration_gJS += "   " + "constructor(){\n   }\n\n";

            this.declaraciones_globales.forEach(element => {
                declaration_gJS += element.traductorJS();
            });
            return declaration_gJS + this.calcularEspaciadoJS() + "}";
        }

        return "";
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

        //dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.modificador);
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.tipo);
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.identificador);

        if (this.declaraciones_globales.length > 0) {

            this.declaraciones_globales.forEach(element => {

                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"LIST_DECLARATION_GLOBAL\"]\n";

                if (esPrimero) {
                    esPrimero = false;
                } else {
                    dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                }

                t_g.id_Nodo++;
                nodoHijo = "nodo" + t_g.id_Nodo;
                dot += nodoHijo + "[label=\"DECLARATION_GLOBAL\"]\n";

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