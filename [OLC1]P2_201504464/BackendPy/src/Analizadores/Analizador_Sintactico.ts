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
    private errorSintactico: boolean = false;

    constructor() { }

    parsear(lista: Array<Token>, listE: Array<Token_Error>) {
        this.listaTokens = lista;
        this.listaErrores = listE;
        this.preanalisis = this.listaTokens[0];
        this.numPreanalisis = 0;
        this.INICIO();
    }

    private INICIO() {
        this.LIST_INSTRUCTIONS();
    }

    private LIST_INSTRUCTIONS() {

        this.INSTRUCTION();
        this.LIST_INSTRUCTIONS_P();
    }

    private INSTRUCTION() {
        this.match(Tipo.RESERVADA_PUBLIC);
        this.INSTRUCTIONS_P();
    }

    private LIST_INSTRUCTIONS_P() {
        if (this.preanalisis.getTipo() != Tipo.LLAVE_DER && this.preanalisis.getTipo() != Tipo.ULTIMO) {
            this.INSTRUCTION();
            this.LIST_INSTRUCTIONS_P();
        }
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
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ class, interface ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba class, interface", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Tipo.LLAVE_DER);
            }
            else {
                this.errorSintactico = true;
                this.match(Tipo.LLAVE_DER);
            }
        }
    }
    /***********************************************************************************/

    private LIST_DECLARATION_GLOBAL() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC) {
            this.DECLARATION_GLOBAL();
            this.LIST_DECLARATION_GLOBAL();
        }
    }

    private DECLARATION_GLOBAL() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR) {
            this.DECLARATION();
            this.match(Tipo.PUNTO_Y_COMA);
        } else if (this.preanalisis.getTipo() == Tipo.IDENTIFICADOR) {
            this.ASIGNATION();
            this.match(Tipo.PUNTO_Y_COMA);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC) {
            this.METHOD();
        } else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ Declaracion global ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba Declaracion global", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Tipo.PUNTO_Y_COMA);
            }
            else {
                this.errorSintactico = true;
                this.match(Tipo.PUNTO_Y_COMA);
            }
        }
    }

    private DEFINITION_FUNCTIONS() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC) {
            this.match(Tipo.RESERVADA_PUBLIC);
            this.TYPE_METHOD();
            this.match(Tipo.IDENTIFICADOR);
            this.match(Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS();
            this.match(Tipo.PARENTESIS_DER);
            this.match(Tipo.PUNTO_Y_COMA);
            this.DEFINITION_FUNCTIONS();
        }
    }
    /***********************************************************************************/

    private DECLARATION() {
        this.TYPE_DATA();
        this.LIST_DECLA_ASIGN();
    }

    private TYPE_DATA() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT) {
            this.match(Tipo.RESERVADA_INT);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN) {
            this.match(Tipo.RESERVADA_BOOLEAN);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE) {
            this.match(Tipo.RESERVADA_DOUBLE);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_STRING) {
            this.match(Tipo.RESERVADA_STRING);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR) {
            this.match(Tipo.RESERVADA_CHAR);
        } else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ Tipo de dato ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba Tipo de dato", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Tipo.PUNTO_Y_COMA);
            }
        }
    }

    private LIST_DECLA_ASIGN() {
        this.DECLA_ASIGN();
        this.LIST_DECLA_ASIGN_P();
    }

    private LIST_DECLA_ASIGN_P() {
        if (this.preanalisis.getTipo() == Tipo.COMA) {
            this.match(Tipo.COMA);
            this.DECLA_ASIGN();
            this.LIST_DECLA_ASIGN_P();
        }
    }

    private DECLA_ASIGN() {
        this.match(Tipo.IDENTIFICADOR);
        this.DECLA_ASIGN_P();
    }

    private DECLA_ASIGN_P() {
        if (this.preanalisis.getTipo() == Tipo.SIGNO_IGUAL) {
            this.match(Tipo.SIGNO_IGUAL);
            this.EXPRESSION();
        }
    }

    /***********************************************************************************/

    private ASIGNATION() {
        this.match(Tipo.IDENTIFICADOR);
        this.ASIGNATION_P();
    }

    private ASIGNATION_P() {
        if (this.preanalisis.getTipo() == Tipo.SIGNO_IGUAL) {
            this.match(Tipo.SIGNO_IGUAL);
            this.EXPRESSION();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_POS_INCREMENTO) {
            this.match(Tipo.SIGNO_POS_INCREMENTO);
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_POS_DECREMENTO) {
            this.match(Tipo.SIGNO_POS_DECREMENTO);
        } else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ =, ++, -- ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba =, ++, --", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Tipo.PUNTO_Y_COMA);
            }
        }
    }

    private ASIGNATION_LOCAL() {
        this.match(Tipo.IDENTIFICADOR);
        this.ASIGNATION_LOCAL_P();
    }

    private ASIGNATION_LOCAL_P() {
        if (this.preanalisis.getTipo() == Tipo.SIGNO_IGUAL || this.preanalisis.getTipo() == Tipo.SIGNO_POS_INCREMENTO
            || this.preanalisis.getTipo() == Tipo.SIGNO_POS_DECREMENTO) {
            this.ASIGNATION_P();
        } else if (this.preanalisis.getTipo() == Tipo.PARENTESIS_IZQ) {
            this.match(Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS_PRIMITIVOS();
            this.match(Tipo.PARENTESIS_DER);
        } else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ =, ++, --, ( ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba =, ++, --, (", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Tipo.PUNTO_Y_COMA);
            }
        }
    }

    private LIST_PARAMETROS_PRIMITIVOS() {
        if (this.preanalisis.getTipo() == Tipo.NUMERO_ENTERO || this.preanalisis.getTipo() == Tipo.NUMERO_DECIMAL
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FALSE || this.preanalisis.getTipo() == Tipo.RESERVADA_TRUE
            || this.preanalisis.getTipo() == Tipo.CADENA_STRING || this.preanalisis.getTipo() == Tipo.CADENA_CHAR
            || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR) {
            this.PRIMITIVOS();
        }
    }

    private PRIMITIVOS() {
        this.PRIMITIVO();
        this.PRIMITIVOS_P();
    }

    private PRIMITIVOS_P() {
        if (this.preanalisis.getTipo() == Tipo.COMA) {
            this.match(Tipo.COMA);
            this.PRIMITIVO();
            this.PRIMITIVOS_P();
        }
    }

    /***********************************************************************************/

    private METHOD() {
        this.match(Tipo.RESERVADA_PUBLIC);
        this.METHOD_P();
    }

    private METHOD_P() {
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
            this.BLOQUE_SENTENCIAS();
        } else {
            this.TYPE_METHOD();
            this.match(Tipo.IDENTIFICADOR);
            this.match(Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS();
            this.match(Tipo.PARENTESIS_DER);
            this.BLOQUE_SENTENCIAS();
        }
    }

    private TYPE_METHOD() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_VOID) {
            this.match(Tipo.RESERVADA_VOID);
        } else {
            this.TYPE_DATA();
        }
    }

    private LIST_PARAMETROS() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR) {
            this.PARAMETROS();
        }
    }

    private PARAMETROS() {
        this.PARAMETRO();
        this.PARAMETROS_P();
    }

    private PARAMETROS_P() {
        if (this.preanalisis.getTipo() == Tipo.COMA) {
            this.match(Tipo.COMA);
            this.PARAMETRO();
            this.PARAMETROS_P();
        }
    }

    private PARAMETRO() {
        this.TYPE_DATA();
        this.match(Tipo.IDENTIFICADOR);
    }

    private BLOQUE_SENTENCIAS() {
        if (this.preanalisis.getTipo() == Tipo.LLAVE_IZQ) {
            this.match(Tipo.LLAVE_IZQ);
            this.LIST_SENTENCIAS();
            this.match(Tipo.LLAVE_DER);
        } else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ { ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba {", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Tipo.PUNTO_Y_COMA);
            }
        }
    }
    /***********************************************************************************/

    private LIST_SENTENCIAS() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Tipo.RESERVADA_SYSTEM) {
            this.SENTENCIAS();
            this.LIST_SENTENCIAS();
        }
    }

    private SENTENCIAS() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR) {
            this.DECLARATION();
            this.match(Tipo.PUNTO_Y_COMA);
        } else if (this.preanalisis.getTipo() == Tipo.IDENTIFICADOR) {
            this.ASIGNATION_LOCAL();
            this.match(Tipo.PUNTO_Y_COMA);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_FOR) {
            this.FOR();
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_WHILE) {
            this.WHILE();
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_DO) {
            this.DO_WHILE();
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_IF) {
            this.IF();
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_RETURN) {
            this.RETURN();
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_SYSTEM) {
            this.PRINT();
        }
    }

    /***********************************************************************************/

    private FOR() {
        this.match(Tipo.RESERVADA_FOR);
        this.match(Tipo.PARENTESIS_IZQ);
        this.DECLARATION();
        this.match(Tipo.PUNTO_Y_COMA);
        this.EXPRESSION();
        this.match(Tipo.PUNTO_Y_COMA);
        this.EXPRESSION();
        this.match(Tipo.PARENTESIS_DER);
        this.BLOQUE_CICLO();
    }

    private BLOQUE_CICLO() {
        this.match(Tipo.LLAVE_IZQ);
        this.BLOQUE_CICLO_P();
        this.match(Tipo.LLAVE_DER);
    }

    private BLOQUE_CICLO_P() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Tipo.RESERVADA_SYSTEM
            || this.preanalisis.getTipo() == Tipo.RESERVADA_BREAK || this.preanalisis.getTipo() == Tipo.RESERVADA_CONTINUE) {
            this.LIST_SENTENCIAS_CICLO();
        }
    }

    private LIST_SENTENCIAS_CICLO() {
        this.SENTENCIAS_CICLO();
        this.LIST_SENTENCIAS_CICLO_P();
    }

    private LIST_SENTENCIAS_CICLO_P() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Tipo.RESERVADA_SYSTEM
            || this.preanalisis.getTipo() == Tipo.RESERVADA_BREAK || this.preanalisis.getTipo() == Tipo.RESERVADA_CONTINUE) {
            this.SENTENCIAS_CICLO();
            this.LIST_SENTENCIAS_CICLO_P();
        }
    }

    private SENTENCIAS_CICLO() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Tipo.RESERVADA_SYSTEM) {
            this.SENTENCIAS();
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_BREAK) {
            this.match(Tipo.RESERVADA_BREAK);
            this.match(Tipo.PUNTO_Y_COMA);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_CONTINUE) {
            this.match(Tipo.RESERVADA_CONTINUE);
            this.match(Tipo.PUNTO_Y_COMA);
        }
    }

    /***********************************************************************************/

    private WHILE() {
        this.match(Tipo.RESERVADA_WHILE);
        this.match(Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Tipo.PARENTESIS_DER);
        this.BLOQUE_CICLO();
    }

    /***********************************************************************************/

    private DO_WHILE() {
        this.match(Tipo.RESERVADA_DO);
        this.BLOQUE_CICLO();
        this.match(Tipo.RESERVADA_WHILE);
        this.match(Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Tipo.PARENTESIS_DER);
        this.match(Tipo.PUNTO_Y_COMA);
    }

    /***********************************************************************************/

    private IF() {
        this.match(Tipo.RESERVADA_IF);
        this.match(Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Tipo.PARENTESIS_DER);
        this.BLOQUE_CICLO();
        this.ELSE();
    }

    private ELSE() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_ELSE) {
            this.match(Tipo.RESERVADA_ELSE);
            this.ELSE_IF();
        }
    }

    private ELSE_IF() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_IF) {
            this.IF();
        } else {
            this.BLOQUE_CICLO();
        }
    }

    /***********************************************************************************/

    private RETURN() {
        this.match(Tipo.RESERVADA_RETURN);
        this.RETURN_P();
        this.match(Tipo.PUNTO_Y_COMA);
    }

    private RETURN_P() {
        if (this.preanalisis.getTipo() == Tipo.NUMERO_ENTERO || this.preanalisis.getTipo() == Tipo.NUMERO_DECIMAL
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FALSE || this.preanalisis.getTipo() == Tipo.RESERVADA_TRUE
            || this.preanalisis.getTipo() == Tipo.CADENA_STRING || this.preanalisis.getTipo() == Tipo.CADENA_CHAR
            || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR || this.preanalisis.getTipo() == Tipo.SIGNO_MENOS
            || this.preanalisis.getTipo() == Tipo.SIGNO_NOT || this.preanalisis.getTipo() == Tipo.PARENTESIS_IZQ) {
            this.EXPRESSION();
        }
    }

    /***********************************************************************************/

    private PRINT() {
        this.match(Tipo.RESERVADA_SYSTEM);
        this.match(Tipo.PUNTO);
        this.match(Tipo.RESERVADA_OUT);
        this.match(Tipo.PUNTO);
        this.PRINT_P();
        this.match(Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Tipo.PARENTESIS_DER);
        this.match(Tipo.PUNTO_Y_COMA);
    }

    private PRINT_P() {
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_PRINTLN) {
            this.match(Tipo.RESERVADA_PRINTLN);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_PRINT) {
            this.match(Tipo.RESERVADA_PRINT);
        } else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ print, println ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba print, println", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Tipo.PUNTO_Y_COMA);
            }
        }
    }

    /***********************************************************************************/

    private EXPRESSION() {
        this.T();
        this.E_P();
    }

    private E_P() {
        if (this.preanalisis.getTipo() == Tipo.SIGNO_MAS) {
            this.match(Tipo.SIGNO_MAS);
            this.T();
            this.E_P();
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_MENOS) {
            this.match(Tipo.SIGNO_MENOS);
            this.T();
            this.E_P();
        }
    }

    private T() {
        this.L();
        this.T_P();
    }

    private T_P() {
        if (this.preanalisis.getTipo() == Tipo.SIGNO_POR) {
            this.match(Tipo.SIGNO_POR);
            this.L();
            this.T_P();
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_DIVISION) {
            this.match(Tipo.SIGNO_DIVISION);
            this.L();
            this.T_P();
        }
    }

    private L() {
        this.R();
        this.L_P();
    }

    private L_P() {
        if (this.preanalisis.getTipo() == Tipo.SIGNO_AND) {
            this.match(Tipo.SIGNO_AND);
            this.R();
            this.L_P();
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_OR) {
            this.match(Tipo.SIGNO_OR);
            this.R();
            this.L_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_XOR) {
            this.match(Tipo.SIGNO_XOR);
            this.R();
            this.L_P();
        }
    }

    private R() {
        this.F();
        this.R_P();
    }

    private R_P() {
        if (this.preanalisis.getTipo() == Tipo.SIGNO_MENOR_QUE) {
            this.match(Tipo.SIGNO_MENOR_QUE);
            this.F();
            this.R_P();
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_MAYOR_QUE) {
            this.match(Tipo.SIGNO_MAYOR_QUE);
            this.F();
            this.R_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_MENOR_IGUAL_QUE) {
            this.match(Tipo.SIGNO_MENOR_IGUAL_QUE);
            this.F();
            this.R_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_MAYOR_IGUAL_QUE) {
            this.match(Tipo.SIGNO_MAYOR_IGUAL_QUE);
            this.F();
            this.R_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_DOBLE_IGUAL) {
            this.match(Tipo.SIGNO_DOBLE_IGUAL);
            this.F();
            this.R_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_DIFERENTE_DE) {
            this.match(Tipo.SIGNO_DIFERENTE_DE);
            this.F();
            this.R_P();
        }
    }

    private F() {
        if (this.preanalisis.getTipo() == Tipo.PARENTESIS_IZQ) {
            this.match(Tipo.PARENTESIS_IZQ);
            this.EXPRESSION();
            this.match(Tipo.PARENTESIS_DER);
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_NOT) {
            this.match(Tipo.SIGNO_NOT);
            this.EXPRESSION();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_MENOS) {
            this.match(Tipo.SIGNO_MENOS);
            this.EXPRESSION();
        } else {
            this.PRIMITIVO();
        }
    }

    private PRIMITIVO() {
        if (this.preanalisis.getTipo() == Tipo.NUMERO_ENTERO) {
            this.match(Tipo.NUMERO_ENTERO);
        }
        else if (this.preanalisis.getTipo() == Tipo.NUMERO_DECIMAL) {
            this.match(Tipo.NUMERO_DECIMAL);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_FALSE) {
            this.match(Tipo.RESERVADA_FALSE);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_TRUE) {
            this.match(Tipo.RESERVADA_TRUE);
        } else if (this.preanalisis.getTipo() == Tipo.CADENA_STRING) {
            this.match(Tipo.CADENA_STRING);
        } else if (this.preanalisis.getTipo() == Tipo.CADENA_CHAR) {
            this.match(Tipo.CADENA_CHAR);
        } else if (this.preanalisis.getTipo() == Tipo.IDENTIFICADOR) {
            this.match(Tipo.IDENTIFICADOR);
            this.INC_DEC_CALL_METHOD();
        } else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ Primitivo ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba Primitivo", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Tipo.PUNTO_Y_COMA);
            }
        }
    }

    private INC_DEC_CALL_METHOD() {
        if (this.preanalisis.getTipo() == Tipo.PARENTESIS_IZQ) {
            this.match(Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS_PRIMITIVOS();
            this.match(Tipo.PARENTESIS_DER);
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_POS_INCREMENTO) {
            this.match(Tipo.SIGNO_POS_INCREMENTO);
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_POS_DECREMENTO) {
            this.match(Tipo.SIGNO_POS_DECREMENTO);
        }
    }

    /***********************************************************************************/
    private match(p: Tipo) {
        if (this.errorSintactico) {
            if (this.numPreanalisis < this.listaTokens.length - 1) {
                if (this.preanalisis.getTipo() == Tipo.PUNTO_Y_COMA || this.preanalisis.getTipo() == Tipo.LLAVE_DER) {
                    if (p == Tipo.PUNTO_Y_COMA) {
                        this.errorSintactico = false;
                        this.numPreanalisis += 1;
                        this.preanalisis = this.listaTokens[this.numPreanalisis];
                    } else if (p == Tipo.LLAVE_DER) {
                        this.errorSintactico = false;
                        this.numPreanalisis += 1;
                        this.preanalisis = this.listaTokens[this.numPreanalisis];
                    }
                    while (this.preanalisis.getTipo() == Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Tipo.COMENTARIO_LINEA) {
                        this.numPreanalisis += 1;
                        this.preanalisis = this.listaTokens[this.numPreanalisis];
                    }
                }
                else {
                    while (this.preanalisis.getTipo() == Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Tipo.COMENTARIO_LINEA) {
                        this.numPreanalisis += 1;
                        this.preanalisis = this.listaTokens[this.numPreanalisis];
                    }
                    this.numPreanalisis += 1;
                    this.preanalisis = this.listaTokens[this.numPreanalisis];
                }
            }
            else {
                //console.log("Ya no se pudo recuperar :(");
                this.addTokenError("", "Ya no se pudo recuperar :(", 0, 0);
            }
        }
        else {
            if (this.preanalisis.getTipo() == p) {
                if (this.numPreanalisis < this.listaTokens.length)//llevaba un -1
                {
                    this.numPreanalisis += 1;
                    this.preanalisis = this.listaTokens[this.numPreanalisis];
                    while (this.preanalisis.getTipo() == Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Tipo.COMENTARIO_LINEA) {
                        this.numPreanalisis += 1;
                        this.preanalisis = this.listaTokens[this.numPreanalisis];
                    }
                }

            }
            else {
                //console.log(">> Error sintactico se esperaba [" + this.getTipoParaError(p) + "] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba " + this.getTipoParaError(p), this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
            }
        }
    }

    private getTipoParaError(p: Tipo): string {

        switch (p) {
            case Tipo.RESERVADA_ARGS:
                return "Reservada_Args";
            case Tipo.RESERVADA_BOOLEAN:
                return "Reservada_Boolean";
            case Tipo.RESERVADA_BREAK:
                return "Reservada_Break";
            case Tipo.RESERVADA_CHAR:
                return "Reservada_Char";
            case Tipo.RESERVADA_CLASS:
                return "Reservada_Class";
            case Tipo.RESERVADA_CONTINUE:
                return "Reservada_Continue";
            case Tipo.RESERVADA_DO:
                return "Reservada_Do";
            case Tipo.RESERVADA_DOUBLE:
                return "Reservada_Double";
            case Tipo.RESERVADA_ELSE:
                return "Reservada_Else";
            case Tipo.RESERVADA_FALSE:
                return "Reservada_False";
            case Tipo.RESERVADA_FOR:
                return "Reservada_For";
            case Tipo.RESERVADA_IF:
                return "Reservada_If";
            case Tipo.RESERVADA_INT:
                return "Reservada_Int";
            case Tipo.RESERVADA_INTERFACE:
                return "Reservada_Interface";
            case Tipo.RESERVADA_MAIN:
                return "Reservada_Main";
            case Tipo.RESERVADA_OUT:
                return "Reservada_Out";
            case Tipo.RESERVADA_PRINT:
                return "Reservada_Print";
            case Tipo.RESERVADA_PRINTLN:
                return "Reservada_PrintLn";
            case Tipo.RESERVADA_PUBLIC:
                return "Reservada_Public";
            case Tipo.RESERVADA_RETURN:
                return "Reservada_Return";
            case Tipo.RESERVADA_STATIC:
                return "Reservada_Static";
            case Tipo.RESERVADA_STRING:
                return "Reservada_String";
            case Tipo.RESERVADA_SYSTEM:
                return "Reservada_System";
            case Tipo.RESERVADA_TRUE:
                return "Reservada_True";
            case Tipo.RESERVADA_VOID:
                return "Reservada_Void";
            case Tipo.RESERVADA_WHILE:
                return "Reservada_While";
            case Tipo.IDENTIFICADOR:
                return "Identificador";
            case Tipo.CADENA_STRING:
                return "Cadena_String";
            case Tipo.CADENA_CHAR:
                return "Cadena_Char";
            case Tipo.COMENTARIO_LINEA:
                return "Comentario_Linea";
            case Tipo.COMENTARIO_BLOQUE:
                return "Comentario_Bloque";
            case Tipo.NUMERO_ENTERO:
                return "NumeroEntero";
            case Tipo.NUMERO_DECIMAL:
                return "Numero_Decimal";
            case Tipo.LLAVE_IZQ:
                return "Llave_Izquierda";
            case Tipo.LLAVE_DER:
                return "Llave_Derecha";
            case Tipo.COMA:
                return "Coma";
            case Tipo.PUNTO:
                return "Punto";
            case Tipo.PUNTO_Y_COMA:
                return "PuntoYcoma";
            case Tipo.CORCHETE_IZQ:
                return "Corchete_Izquierdo";
            case Tipo.CORCHETE_DER:
                return "Corchete_Derecho";
            case Tipo.PARENTESIS_IZQ:
                return "Parentesis_Izquierdo";
            case Tipo.PARENTESIS_DER:
                return "Parentesis_Derecho";
            case Tipo.SIGNO_MAS:
                return "Signo_Mas";
            case Tipo.SIGNO_MENOS:
                return "Signo_Menos";
            case Tipo.SIGNO_POR:
                return "Signo_Por";
            case Tipo.SIGNO_DIVISION:
                return "Signo_Division";
            case Tipo.SIGNO_MENOR_QUE:
                return "Signo_MenorQue";
            case Tipo.SIGNO_MAYOR_QUE:
                return "Signo_MayorQue";
            case Tipo.SIGNO_DIFERENTE_DE:
                return "Signo_DiferenteDe";
            case Tipo.SIGNO_POS_INCREMENTO:
                return "Signo_PosIncremento";
            case Tipo.SIGNO_POS_DECREMENTO:
                return "Signo_PosDecremento";
            case Tipo.SIGNO_MAYOR_IGUAL_QUE:
                return "Signo_MayorIgualQue";
            case Tipo.SIGNO_MENOR_IGUAL_QUE:
                return "Signo_MenorIgualQue";
            case Tipo.SIGNO_IGUAL:
                return "Signo_Igual";
            case Tipo.SIGNO_DOBLE_IGUAL:
                return "Signo_DobleIgual";
            case Tipo.SIGNO_AND:
                return "Signo_AND";
            case Tipo.SIGNO_OR:
                return "Signo_OR";
            case Tipo.SIGNO_NOT:
                return "Signo_NOT";
            case Tipo.SIGNO_XOR:
                return "Signo_XOR";
            case Tipo.ULTIMO:
                return "Ultimo";
            default:
                return "Desconocido";
        }
    }

    getListaErrores(): Array<Token_Error> {
        return this.listaErrores;
    }

    private addTokenError(caracter: string, descripcion: string, fila: number, columna: number) {
        this.listaErrores.push(new Token_Error(caracter, TipoError.SINTACTICO, descripcion, fila, columna));
    }
}