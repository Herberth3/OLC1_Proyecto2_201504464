import { isMethodDeclaration } from "typescript";
import { Tipo, Token } from "./Token";
import { TipoError, Token_Error } from "./Token_Error";

export class Analizador_Sintactico {
    /** VARIABLE QUE RECORRE LA LISTA DE TOKENS **/
    private numPreanalisis: number;
    /** VARIABLE QUE REPRESENTA EL TOKEN DE ANTICIPACION **/
    private preanalisis: Token;
    /** LISTA QUE ALMACENA LA LISTA DE TOKENS RECIBIDA DEL ANALIZADOR LEXICO **/
    private listaTokens: Array<Token>;
    /** LISTA QUE ALMACENA LA LISTA DE ERRORES RECIBIDA DEL ANALISIS LEXICO **/
    private listaErrores: Array<Token_Error>;
    private existeError: boolean = false;

    constructor() { }

    parsear(lista: Array<Token>, listE: Array<Token_Error>) {
        this.listaTokens = lista;
        this.listaErrores = listE;
        this.preanalisis = this.listaTokens[0];
        this.numPreanalisis = 0;
        this.INICIO();
    }

    private INICIO() {
        this.INSTRUCTIONS();
    }

    private INSTRUCTIONS() {
        this.match(Tipo.RESERVADA_PUBLIC);
        this.INSTRUCTIONS_P();
        this.LIST_INSTRUCTIONS();
    }

    private INSTRUCTIONS_P() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_CLASS) {
            this.match(Tipo.RESERVADA_CLASS);
            this.match(Tipo.IDENTIFICADOR);
            this.match(Tipo.LLAVE_IZQ);
            this.LIST_DECLARATION_GLOBAL();
            this.match(Tipo.LLAVE_DER);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_INTERFACE) {
            this.match(Tipo.RESERVADA_INTERFACE);
            this.match(Tipo.IDENTIFICADOR);
            this.match(Tipo.LLAVE_IZQ);
            this.DEFINITION_FUNCTIONS();
            this.match(Tipo.LLAVE_DER);
        } else {
            /** ERROR **/
        }
    }

    private LIST_INSTRUCTIONS() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC) {
            this.INSTRUCTIONS();
            this.LIST_INSTRUCTIONS();
        }
    }
/***********************************************************************************/

private LIST_DECLARATION_GLOBAL(){
    if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
    || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
    || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
    || this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC) {
        this.DECLARATION_GLOBAL();
        this.LIST_DECLARATION_GLOBAL();
    }
}

private DECLARATION_GLOBAL(){
    if(this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
    || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
    || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR){
        this.DECLARATION();
    }else if(this.preanalisis.getTipo() == Tipo.IDENTIFICADOR){
        this.ASIGNATION();
    }else if(this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC){
        this.match(Tipo.RESERVADA_PUBLIC);
        this.METHOD();
    }else{
        /** ERROR **/
    }
}

private DEFINITION_FUNCTIONS(){
    if(this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC){
        this.match(Tipo.RESERVADA_PUBLIC);
        this.TYPE_METHOD();
        this.match(Tipo.IDENTIFICADOR);
        this.match(Tipo.PARENTESIS_IZQ);
        this.PARAMETROS();
        this.match(Tipo.PARENTESIS_DER);
        this.match(Tipo.PUNTO_Y_COMA);
        this.DEFINITION_FUNCTIONS();
    }
}
/***********************************************************************************/

private DECLARATION(){
    this.TYPE_DATA();
    this.LIST_DECLA_ASIGN();
    this.match(Tipo.PUNTO_Y_COMA);
}

private TYPE_DATA(){
    if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT) {
        this.match(Tipo.RESERVADA_INT);
    } else if(this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN){
        this.match(Tipo.RESERVADA_BOOLEAN);
    } else if(this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE){
        this.match(Tipo.RESERVADA_DOUBLE);
    } else if(this.preanalisis.getTipo() == Tipo.RESERVADA_STRING){
        this.match(Tipo.RESERVADA_STRING);
    } else if(this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR){
        this.match(Tipo.RESERVADA_CHAR);
    }else{
        /** ERROR **/
    }
}

private LIST_DECLA_ASIGN(){
    this.match(Tipo.IDENTIFICADOR);
    this.ASIGN();
}

private ASIGN(){
    if (this.preanalisis.getTipo() == Tipo.SIGNO_IGUAL) {
        this.match(Tipo.SIGNO_IGUAL);
        //this.EXPRESSION();
        this.ASIGN_P();
    } else {
        this.ASIGN_P();
    }
}

private ASIGN_P(){
    if(this.preanalisis.getTipo() == Tipo.COMA) {
        this.match(Tipo.COMA);
        this.LIST_DECLA_ASIGN();
    }
}

/***********************************************************************************/

private ASIGNATION(){
    this.match(Tipo.IDENTIFICADOR);
    this.match(Tipo.SIGNO_IGUAL);
    //this.EXPRESSION();
    this.match(Tipo.PUNTO_Y_COMA);
}

/***********************************************************************************/

private METHOD(){
    if (this.preanalisis.getTipo() == Tipo.RESERVADA_STATIC) {
        this.match(Tipo.RESERVADA_STATIC);
        this.match(Tipo.RESERVADA_VOID);
        this.match(Tipo.RESERVADA_MAIN);
        this.match(Tipo.PARENTESIS_IZQ);
        this.match(Tipo.RESERVADA_STRING);
        this.match(Tipo.CORCHETE_IZQ);
        this.match(Tipo.CORCHETE_DER);
        this.match(Tipo.RESERVADA_ARGS);
        this.match(Tipo.PARENTESIS_DER);
        this.match(Tipo.LLAVE_IZQ);
        this.LIST_SENTENCIAS();
        this.match(Tipo.LLAVE_DER);
    } else {
        this.TYPE_METHOD();
        this.match(Tipo.IDENTIFICADOR);
        this.match(Tipo.PARENTESIS_IZQ);
        this.PARAMETROS();
        this.match(Tipo.PARENTESIS_DER);
        this.match(Tipo.LLAVE_IZQ);
        this.LIST_SENTENCIAS();
        this.match(Tipo.LLAVE_DER);
    }
}

private TYPE_METHOD(){
    if (this.preanalisis.getTipo() == Tipo.RESERVADA_VOID) {
        this.match(Tipo.RESERVADA_VOID);
    }else{
        this.TYPE_DATA();
    }
}

private PARAMETROS(){
    if(this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
    || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
    || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR){
        this.TYPE_DATA();
        this.match(Tipo.IDENTIFICADOR);
        this.LIST_PARAMETROS();
    }
}

private LIST_PARAMETROS(){
    if(this.preanalisis.getTipo() == Tipo.COMA) {
        this.match(Tipo.COMA);
        this.TYPE_DATA();
        this.match(Tipo.IDENTIFICADOR);
        this.LIST_PARAMETROS();
    }
}
/***********************************************************************************/

private LIST_SENTENCIAS(){
    
}

/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/
    private match(p: Tipo) {
        if (p != this.preanalisis.getTipo()) {
            console.log("Se esperaba " + this.getTipoParaError(p))
        }

        if (this.preanalisis.getTipo() != Tipo.ULTIMO) {
            this.numPreanalisis += 1;
            this.preanalisis = this.listaTokens[this.numPreanalisis];
        }
    }

    private getTipoParaError(p: Tipo): string {
        return "";
    }

    getListaErrores(): Array<Token_Error> {
        return this.listaErrores;
    }

    private addTokenError(caracter: string, descripcion: string, fila: number, columna: number) {
        this.listaErrores.push(new Token_Error(caracter, TipoError.SINTACTICO, descripcion, fila, columna));
    }
}