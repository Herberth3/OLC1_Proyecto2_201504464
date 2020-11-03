import { Tipo, Token } from "./Token";
import { TipoError, Token_Error } from "./Token_Error";

export class Listas{
    static lista_Tokens = new Array<Token>();
    static lista_Errores = new Array<Token_Error>();

    constructor(){

    }

    static getListaTokens(): Array<Token> {
        return this.lista_Tokens;
    }

    static getListaErrores(): Array<Token_Error> {
        return this.lista_Errores;
    }

    static setListaTokens(nueva: Array<Token>){
        this.lista_Tokens = nueva;
    }

    static setListaErrores(nueva: Array<Token_Error>){
        this.lista_Errores = nueva;
    }

    static addToken(tipo: Tipo, lexema: string, fila: number, columna: number) {
        this.lista_Tokens.push(new Token(tipo, lexema, fila, columna));
    }

    static addTokenError(caracter: string, tipo: TipoError, descripcion: string, fila: number, columna: number) {
        this.lista_Errores.push(new Token_Error(caracter, tipo, descripcion, fila, columna));
    }
}