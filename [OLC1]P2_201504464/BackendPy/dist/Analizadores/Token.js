"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tipo;
(function (Tipo) {
    Tipo[Tipo["RESERVADA_PUBLIC"] = 0] = "RESERVADA_PUBLIC";
    Tipo[Tipo["RESERVADA_CLASS"] = 1] = "RESERVADA_CLASS";
    Tipo[Tipo["RESERVADA_INTERFACE"] = 2] = "RESERVADA_INTERFACE";
    Tipo[Tipo["RESERVADA_VOID"] = 3] = "RESERVADA_VOID";
    Tipo[Tipo["RESERVADA_FOR"] = 4] = "RESERVADA_FOR";
    Tipo[Tipo["RESERVADA_WHILE"] = 5] = "RESERVADA_WHILE";
    Tipo[Tipo["RESERVADA_DO"] = 6] = "RESERVADA_DO";
    Tipo[Tipo["RESERVADA_IF"] = 7] = "RESERVADA_IF";
    Tipo[Tipo["RESERVADA_ELSE"] = 8] = "RESERVADA_ELSE";
    Tipo[Tipo["RESERVADA_BREAK"] = 9] = "RESERVADA_BREAK";
    Tipo[Tipo["RESERVADA_CONTINUE"] = 10] = "RESERVADA_CONTINUE";
    Tipo[Tipo["RESERVADA_RETURN"] = 11] = "RESERVADA_RETURN";
    Tipo[Tipo["RESERVADA_INT"] = 12] = "RESERVADA_INT";
    Tipo[Tipo["RESERVADA_BOOLEAN"] = 13] = "RESERVADA_BOOLEAN";
    Tipo[Tipo["RESERVADA_FALSE"] = 14] = "RESERVADA_FALSE";
    Tipo[Tipo["RESERVADA_TRUE"] = 15] = "RESERVADA_TRUE";
    Tipo[Tipo["RESERVADA_DOUBLE"] = 16] = "RESERVADA_DOUBLE";
    Tipo[Tipo["RESERVADA_STRING"] = 17] = "RESERVADA_STRING";
    Tipo[Tipo["RESERVADA_CHAR"] = 18] = "RESERVADA_CHAR";
    Tipo[Tipo["RESERVADA_STATIC"] = 19] = "RESERVADA_STATIC";
    Tipo[Tipo["RESERVADA_MAIN"] = 20] = "RESERVADA_MAIN";
    Tipo[Tipo["RESERVADA_ARGS"] = 21] = "RESERVADA_ARGS";
    Tipo[Tipo["RESERVADA_SYSTEM"] = 22] = "RESERVADA_SYSTEM";
    Tipo[Tipo["RESERVADA_OUT"] = 23] = "RESERVADA_OUT";
    Tipo[Tipo["RESERVADA_PRINTLN"] = 24] = "RESERVADA_PRINTLN";
    Tipo[Tipo["RESERVADA_PRINT"] = 25] = "RESERVADA_PRINT";
    Tipo[Tipo["RESERVADA_NEW"] = 26] = "RESERVADA_NEW";
    Tipo[Tipo["IDENTIFICADOR"] = 27] = "IDENTIFICADOR";
    Tipo[Tipo["CADENA_STRING"] = 28] = "CADENA_STRING";
    Tipo[Tipo["CADENA_CHAR"] = 29] = "CADENA_CHAR";
    Tipo[Tipo["COMENTARIO_LINEA"] = 30] = "COMENTARIO_LINEA";
    Tipo[Tipo["COMENTARIO_BLOQUE"] = 31] = "COMENTARIO_BLOQUE";
    Tipo[Tipo["NUMERO_ENTERO"] = 32] = "NUMERO_ENTERO";
    Tipo[Tipo["NUMERO_DECIMAL"] = 33] = "NUMERO_DECIMAL";
    Tipo[Tipo["LLAVE_IZQ"] = 34] = "LLAVE_IZQ";
    Tipo[Tipo["LLAVE_DER"] = 35] = "LLAVE_DER";
    Tipo[Tipo["COMA"] = 36] = "COMA";
    Tipo[Tipo["PUNTO"] = 37] = "PUNTO";
    Tipo[Tipo["PUNTO_Y_COMA"] = 38] = "PUNTO_Y_COMA";
    Tipo[Tipo["CORCHETE_IZQ"] = 39] = "CORCHETE_IZQ";
    Tipo[Tipo["CORCHETE_DER"] = 40] = "CORCHETE_DER";
    Tipo[Tipo["PARENTESIS_IZQ"] = 41] = "PARENTESIS_IZQ";
    Tipo[Tipo["PARENTESIS_DER"] = 42] = "PARENTESIS_DER";
    Tipo[Tipo["SIGNO_MAS"] = 43] = "SIGNO_MAS";
    Tipo[Tipo["SIGNO_MENOS"] = 44] = "SIGNO_MENOS";
    Tipo[Tipo["SIGNO_POR"] = 45] = "SIGNO_POR";
    Tipo[Tipo["SIGNO_DIVISION"] = 46] = "SIGNO_DIVISION";
    Tipo[Tipo["SIGNO_MENOR_QUE"] = 47] = "SIGNO_MENOR_QUE";
    Tipo[Tipo["SIGNO_MAYOR_QUE"] = 48] = "SIGNO_MAYOR_QUE";
    Tipo[Tipo["SIGNO_DIFERENTE_DE"] = 49] = "SIGNO_DIFERENTE_DE";
    Tipo[Tipo["SIGNO_POS_INCREMENTO"] = 50] = "SIGNO_POS_INCREMENTO";
    Tipo[Tipo["SIGNO_POS_DECREMENTO"] = 51] = "SIGNO_POS_DECREMENTO";
    Tipo[Tipo["SIGNO_MAYOR_IGUAL_QUE"] = 52] = "SIGNO_MAYOR_IGUAL_QUE";
    Tipo[Tipo["SIGNO_MENOR_IGUAL_QUE"] = 53] = "SIGNO_MENOR_IGUAL_QUE";
    Tipo[Tipo["SIGNO_IGUAL"] = 54] = "SIGNO_IGUAL";
    Tipo[Tipo["SIGNO_DOBLE_IGUAL"] = 55] = "SIGNO_DOBLE_IGUAL";
    Tipo[Tipo["SIGNO_AND"] = 56] = "SIGNO_AND";
    Tipo[Tipo["SIGNO_OR"] = 57] = "SIGNO_OR";
    Tipo[Tipo["SIGNO_NOT"] = 58] = "SIGNO_NOT";
    Tipo[Tipo["SIGNO_XOR"] = 59] = "SIGNO_XOR";
    Tipo[Tipo["DESCONOCIDO"] = 60] = "DESCONOCIDO";
})(Tipo = exports.Tipo || (exports.Tipo = {}));
class Token {
    constructor(tipo, auxLex, fila, columna) {
        this.tipoToken = tipo;
        this.lexema = auxLex;
        this.filaToken = fila;
        this.columnaToken = columna;
        this.tipoTokenEnString = this.getTipoEnString();
    }
    getTipo() {
        return this.tipoToken;
    }
    getLexema() {
        return this.lexema;
    }
    getFila() {
        return this.filaToken;
    }
    getColumna() {
        return this.columnaToken;
    }
    getTipoEnString() {
        let nombreToken = "";
        switch (this.tipoToken) {
            case Tipo.RESERVADA_ARGS:
                nombreToken = "Reservada_Args";
                break;
            case Tipo.RESERVADA_BOOLEAN:
                nombreToken = "Reservada_Boolean";
                break;
            case Tipo.RESERVADA_BREAK:
                nombreToken = "Reservada_Break";
                break;
            case Tipo.RESERVADA_CHAR:
                nombreToken = "Reservada_Char";
                break;
            case Tipo.RESERVADA_CLASS:
                nombreToken = "Reservada_Class";
                break;
            case Tipo.RESERVADA_CONTINUE:
                nombreToken = "Reservada_Continue";
                break;
            case Tipo.RESERVADA_DO:
                nombreToken = "Reservada_Do";
                break;
            case Tipo.RESERVADA_DOUBLE:
                nombreToken = "Reservada_Double";
                break;
            case Tipo.RESERVADA_ELSE:
                nombreToken = "Reservada_Else";
                break;
            case Tipo.RESERVADA_FALSE:
                nombreToken = "Reservada_False";
                break;
            case Tipo.RESERVADA_FOR:
                nombreToken = "Reservada_For";
                break;
            case Tipo.RESERVADA_IF:
                nombreToken = "Reservada_If";
                break;
            case Tipo.RESERVADA_INT:
                nombreToken = "Reservada_Int";
                break;
            case Tipo.RESERVADA_INTERFACE:
                nombreToken = "Reservada_Interface";
                break;
            case Tipo.RESERVADA_MAIN:
                nombreToken = "Reservada_Main";
                break;
            case Tipo.RESERVADA_NEW:
                nombreToken = "Reservada_New";
                break;
            case Tipo.RESERVADA_OUT:
                nombreToken = "Reservada_Out";
                break;
            case Tipo.RESERVADA_PRINT:
                nombreToken = "Reservada_Print";
                break;
            case Tipo.RESERVADA_PRINTLN:
                nombreToken = "Reservada_PrintLn";
                break;
            case Tipo.RESERVADA_PUBLIC:
                nombreToken = "Reservada_Public";
                break;
            case Tipo.RESERVADA_RETURN:
                nombreToken = "Reservada_Return";
                break;
            case Tipo.RESERVADA_STATIC:
                nombreToken = "Reservada_Static";
                break;
            case Tipo.RESERVADA_STRING:
                nombreToken = "Reservada_String";
                break;
            case Tipo.RESERVADA_SYSTEM:
                nombreToken = "Reservada_System";
                break;
            case Tipo.RESERVADA_TRUE:
                nombreToken = "Reservada_True";
                break;
            case Tipo.RESERVADA_VOID:
                nombreToken = "Reservada_Void";
                break;
            case Tipo.RESERVADA_WHILE:
                nombreToken = "Reservada_While";
                break;
            case Tipo.IDENTIFICADOR:
                nombreToken = "Identificador";
                break;
            case Tipo.CADENA_STRING:
                nombreToken = "Cadena_String";
                break;
            case Tipo.CADENA_CHAR:
                nombreToken = "Cadena_Char";
                break;
            case Tipo.COMENTARIO_LINEA:
                nombreToken = "Comentario_Linea";
                break;
            case Tipo.COMENTARIO_BLOQUE:
                nombreToken = "Comentario_Bloque";
                break;
            case Tipo.NUMERO_ENTERO:
                nombreToken = "NumeroEntero";
                break;
            case Tipo.NUMERO_DECIMAL:
                nombreToken = "Numero_Decimal";
                break;
            case Tipo.LLAVE_IZQ:
                nombreToken = "Llave_Izquierda";
                break;
            case Tipo.LLAVE_DER:
                nombreToken = "Llave_Derecha";
                break;
            case Tipo.COMA:
                nombreToken = "Coma";
                break;
            case Tipo.PUNTO:
                nombreToken = "Punto";
                break;
            case Tipo.PUNTO_Y_COMA:
                nombreToken = "PuntoYcoma";
                break;
            case Tipo.CORCHETE_IZQ:
                nombreToken = "Corchete_Izquierdo";
                break;
            case Tipo.CORCHETE_DER:
                nombreToken = "Corchete_Derecho";
                break;
            case Tipo.PARENTESIS_IZQ:
                nombreToken = "Parentesis_Izquierdo";
                break;
            case Tipo.PARENTESIS_DER:
                nombreToken = "Parentesis_Derecho";
                break;
            case Tipo.SIGNO_MAS:
                nombreToken = "Signo_Mas";
                break;
            case Tipo.SIGNO_MENOS:
                nombreToken = "Signo_Menos";
                break;
            case Tipo.SIGNO_POR:
                nombreToken = "Signo_Por";
                break;
            case Tipo.SIGNO_DIVISION:
                nombreToken = "Signo_Division";
                break;
            case Tipo.SIGNO_MENOR_QUE:
                nombreToken = "Signo_MenorQue";
                break;
            case Tipo.SIGNO_MAYOR_QUE:
                nombreToken = "Signo_MayorQue";
                break;
            case Tipo.SIGNO_DIFERENTE_DE:
                nombreToken = "Signo_DiferenteDe";
                break;
            case Tipo.SIGNO_POS_INCREMENTO:
                nombreToken = "Signo_PosIncremento";
                break;
            case Tipo.SIGNO_POS_DECREMENTO:
                nombreToken = "Signo_PosDecremento";
                break;
            case Tipo.SIGNO_MAYOR_IGUAL_QUE:
                nombreToken = "Signo_MayorIgualQue";
                break;
            case Tipo.SIGNO_MENOR_IGUAL_QUE:
                nombreToken = "Signo_MenorIgualQue";
                break;
            case Tipo.SIGNO_IGUAL:
                nombreToken = "Signo_Igual";
                break;
            case Tipo.SIGNO_DOBLE_IGUAL:
                nombreToken = "Signo_DobleIgual";
                break;
            case Tipo.SIGNO_AND:
                nombreToken = "Signo_AND";
                break;
            case Tipo.SIGNO_OR:
                nombreToken = "Signo_OR";
                break;
            case Tipo.SIGNO_NOT:
                nombreToken = "Signo_NOT";
                break;
            case Tipo.SIGNO_XOR:
                nombreToken = "Signo_XOR";
                break;
            default:
                nombreToken = "Desconocido";
                break;
        }
        return nombreToken;
    }
}
exports.Token = Token;
