import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class Parameter extends Template_Instruccion{
    
    tipo: string;
    identificador: string;

    /**
     * 
     * @param tipo Tipo de primitivo, puede ser int, double, String, char, boolean.
     * @param id Identificador del parametro.
     */

    constructor(tipo: string, id: string){
        super(1);
        this.tipo = tipo;
        this.identificador = id;
    }

    traductorJS(): string {
        return this.identificador;
    }
    calcularEspaciadoJS(): string {
        throw new Error("Method not implemented.");
    }

    recolectarDot(t_g: Template_Grafo): string {
        let dot: string = "";
        let nodoPadre_G: string = "nodo" + t_g.id_Nodo;

        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.tipo);
        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.identificador);

        return dot;
    }

    recolectorDotHijo(t_g: Template_Grafo, nodoPadre_G: string, nombreHijo: string): string{
        let dot: string = "";
        let nodoHijo: string = "";

        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\""+ nombreHijo +"\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";

        return dot;
    }
    
}