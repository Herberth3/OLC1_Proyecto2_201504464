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
}