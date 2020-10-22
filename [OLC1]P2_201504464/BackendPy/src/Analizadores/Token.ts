export enum Tipo {
    RESERVADA_PUBLIC,
    RESERVADA_CLASS,
    RESERVADA_INTERFACE,
    RESERVADA_VOID,
    RESERVADA_FOR,
    RESERVADA_WHILE,
    RESERVADA_DO,
    RESERVADA_IF,
    RESERVADA_ELSE,
    RESERVADA_BREAK,
    RESERVADA_CONTINUE,
    RESERVADA_RETURN,
    RESERVADA_INT,
    RESERVADA_BOOLEAN,
    RESERVADA_FALSE,
    RESERVADA_TRUE,
    RESERVADA_DOUBLE,
    RESERVADA_STRING,
    RESERVADA_CHAR,
    RESERVADA_STATIC,
    RESERVADA_MAIN,
    RESERVADA_ARGS,
    RESERVADA_SYSTEM,
    RESERVADA_OUT,
    RESERVADA_PRINTLN,
    RESERVADA_PRINT,
    IDENTIFICADOR,
    CADENA_STRING,
    CADENA_CHAR,
    COMENTARIO_LINEA,
    COMENTARIO_BLOQUE,
    NUMERO_ENTERO,
    NUMERO_DECIMAL,
    LLAVE_IZQ,
    LLAVE_DER,
    COMA,
    PUNTO,
    PUNTO_Y_COMA,
    CORCHETE_IZQ,
    CORCHETE_DER,
    PARENTESIS_IZQ,
    PARENTESIS_DER,
    SIGNO_MAS,
    SIGNO_MENOS,
    SIGNO_POR,
    SIGNO_DIVISION,
    SIGNO_MENOR_QUE,
    SIGNO_MAYOR_QUE,
    SIGNO_DIFERENTE_DE,
    SIGNO_POS_INCREMENTO,
    SIGNO_POS_DECREMENTO,
    SIGNO_MAYOR_IGUAL_QUE,
    SIGNO_MENOR_IGUAL_QUE,
    SIGNO_IGUAL,
    SIGNO_DOBLE_IGUAL,
    SIGNO_AND,
    SIGNO_OR,
    SIGNO_NOT,
    SIGNO_XOR,
    DESCONOCIDO,
    ULTIMO
}

export class Token {
    private tipoToken: Tipo;
    private lexema: string;
    private filaToken: number;
    private columnaToken: number;
    private tipoTokenEnString: string;

    constructor(tipo: Tipo, auxLex: string, fila: number, columna: number) {
        this.tipoToken = tipo;
        this.lexema = auxLex;
        this.filaToken = fila;
        this.columnaToken = columna;
        this.tipoTokenEnString = this.getTipoEnString()
    }

    getTipo(): Tipo {
        return this.tipoToken;
    }

    getLexema(): string {
        return this.lexema;
    }

    getFila(): number {
        return this.filaToken;
    }

    getColumna(): number {
        return this.columnaToken;
    }

    getTipoEnString(): string {
        let nombreToken: string = "";

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
            case Tipo.ULTIMO:
                nombreToken = "Ultimo";
                break;
            default:
                nombreToken = "Desconocido";
                break;
        }
        return nombreToken;
    }
}