import { Template_Grafo } from "./Template_Grafo";

export abstract class Template_Instruccion {
    public columna: number = 0;

    /** 
     * @param columna   Columna donde se encuentra la instruccion
    */

    constructor(columna: number) {
        this.columna = columna;
    }

    /** Traduce el codigo a Javascript **/
    abstract traductorJS(): string;
    abstract calcularEspaciadoJS(): string;

    /** Recolecta el codigo dot para graficar el AST **/
    abstract recolectarDot(t_g: Template_Grafo): string;
    abstract recolectorDotHijo(t_g: Template_Grafo, nodoPadre_G: string, nombreHijo: string): string;
}