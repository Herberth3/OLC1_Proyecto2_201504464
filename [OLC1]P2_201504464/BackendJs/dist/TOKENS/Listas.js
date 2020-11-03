"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const Token_Error_1 = require("./Token_Error");
class Listas {
    constructor() {
    }
    static getListaTokens() {
        return this.lista_Tokens;
    }
    static getListaErrores() {
        return this.lista_Errores;
    }
    static setListaTokens(nueva) {
        this.lista_Tokens = nueva;
    }
    static setListaErrores(nueva) {
        this.lista_Errores = nueva;
    }
    static addToken(tipo, lexema, fila, columna) {
        this.lista_Tokens.push(new Token_1.Token(tipo, lexema, fila, columna));
    }
    static addTokenError(caracter, tipo, descripcion, fila, columna) {
        this.lista_Errores.push(new Token_Error_1.Token_Error(caracter, tipo, descripcion, fila, columna));
    }
}
exports.Listas = Listas;
Listas.lista_Tokens = new Array();
Listas.lista_Errores = new Array();
