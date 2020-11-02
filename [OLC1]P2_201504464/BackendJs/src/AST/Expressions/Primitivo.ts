import { Template_Grafo } from "../Template_Grafo";
import { Template_Instruccion } from "../template_Instruccion";

export class Primitivo extends Template_Instruccion{
    
    valor:any;

    /**
     * 
     * @param valor Valor que contiene el primitivo a operar.
     */

    constructor(valor:any){
        super(1);
        this.valor = valor;
    }
    
    traductorJS(): string {
        return this.valor;
    }

    calcularEspaciadoJS(): string {
        throw new Error("Method not implemented.");
    }
    
    recolectarDot(t_g: Template_Grafo): string {
        let dot: string = "";
        let nodoPadre_G: string = "nodo" + t_g.id_Nodo;
        let nodoHijo: string = "";

        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"PRIMITIVO\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";

        /** AHORA EL NODOPADRE_G ES EL NODO PRIMITIVO **/
        nodoPadre_G = nodoHijo;

        dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.valor);

        return dot;
    }
    
    recolectorDotHijo(t_g: Template_Grafo, nodoPadre_G: string, nombreHijo: string): string {
        let dot: string = "";
        let nodoHijo: string = "";

        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;

        if (this.valor[0] == '\"') {
            const re = /\"/gi;
            dot += nodoHijo + "[label=\"\\\""+ nombreHijo.replace(re, '') +"\\\"\"]\n";
        } else{
            dot += nodoHijo + "[label=\""+ nombreHijo +"\"]\n";
        }

        dot += nodoPadre_G + " -> " + nodoHijo + "\n";

        return dot;
    }
}