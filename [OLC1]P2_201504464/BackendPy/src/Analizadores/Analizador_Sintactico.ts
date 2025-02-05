import { Abstrac_Sintactic_Tree } from "../AST/Abstrac_Sintactic_Tree";
import { Asignation } from "../AST/Declaration-Definition-Global/Asignation";
import { Declaration } from "../AST/Declaration-Definition-Global/Declaration";
import { Identifier } from "../AST/Declaration-Definition-Global/Identifier";
import { Method } from "../AST/Declaration-Definition-Global/Method";
import { Parameter } from "../AST/Declaration-Definition-Global/Parameter";
import { Class_Interface } from "../AST/Instructions/Class_Interface";
import { Print } from "../AST/Sentences/Print";
import { Return_Continue_Break } from "../AST/Sentences/Return_Continue_Break";
import { While } from "../AST/Sentences/While";
import { Template_Instruccion } from "../AST/Template_Instruccion";
import { Type_Operation } from "../AST/Types";
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

    /** LISTA QUE ALMACENA LAS INSTRUCCIONES RECOLECTADAS DURANTE EL ANALISIS **/
    private lista_Instrucciones: Array<Template_Instruccion>;
    /** LISTA QUE ALMACENA LAS DECLA-ASIGN DE UNA DECLARACION **/
    private lista_Decla_Asign: Array<Template_Instruccion>;
    /** LISTA QUE ALMACENA LAS DECLARACIONES-GLOBALES DENTRO DE UNA CLASE **/
    private lista_Declaraciones_Global: Array<Template_Instruccion>;
    /** LISTA QUE ALMACENA LOS PARAMETROS DE LOS METODOS **/
    private lista_Parametros: Array<Template_Instruccion>;
    /** LISTA QUE ALMACENA LAS SENTENCIAS DENTRO DE UN METODO **/
    private lista_Sentencias: Array<Template_Instruccion>;
    /** LISTA QUE ALMACENA LA DEFINICIONES DE FUNCION PARA LAS INTERFACES **/
    private lista_Definition_F: Array<Template_Instruccion>;
    /** LISTA QUE ALMACENA LAS SENTENCIAS DENTRO DE LOS CICLOS **/
    private lista_Bloque_Ciclo: Array<Template_Instruccion>;
    /** RECOLECTOR DE EXPRESION **/
    private expresion: string = "";

    constructor() {
        this.lista_Instrucciones = [];
        this.lista_Decla_Asign = [];
        this.lista_Declaraciones_Global = [];
        this.lista_Parametros = [];
        this.lista_Sentencias = [];
        this.lista_Definition_F = [];
        this.lista_Bloque_Ciclo = [];
    }

    parsear(lista: Array<Token>, listE: Array<Token_Error>): Abstrac_Sintactic_Tree {
        this.listaTokens = lista;
        this.listaErrores = listE;
        this.preanalisis = this.listaTokens[0];
        this.numPreanalisis = 0;
        this.INICIO();

        /***********************************************************/
        let ast = new Abstrac_Sintactic_Tree(this.lista_Instrucciones);
        return ast;
        /***********************************************************/
    }

    private INICIO() {
        this.LIST_INSTRUCTIONS();
    }

    private LIST_INSTRUCTIONS() {

        this.INSTRUCTION();
        this.LIST_INSTRUCTIONS_P();
    }

    private INSTRUCTION() {
        /*******************************/
        var instruccion: Template_Instruccion;
        /*******************************/

        this.match(Tipo.RESERVADA_PUBLIC);
        instruccion = this.INSTRUCTIONS_P();
        this.lista_Declaraciones_Global = [];
        this.lista_Definition_F = [];

        /****************************************/
        this.lista_Instrucciones.push(instruccion);
        /****************************************/
    }

    private LIST_INSTRUCTIONS_P() {
        if (this.preanalisis.getTipo() != Tipo.LLAVE_DER && this.preanalisis.getTipo() != Tipo.ULTIMO) {
            this.INSTRUCTION();
            this.LIST_INSTRUCTIONS_P();
        }
    }

    private INSTRUCTIONS_P(): Template_Instruccion {
        /**************************/
        var cla_int = "";
        var id = "";
        var arrayDecla: Array<Template_Instruccion> = [];
        var column = 0;
        /**************************/
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_CLASS) {
            cla_int = this.preanalisis.getLexema();
            column = this.preanalisis.getColumna() - 7;
            this.match(Tipo.RESERVADA_CLASS);
            id = this.preanalisis.getLexema();
            this.match(Tipo.IDENTIFICADOR);
            this.match(Tipo.LLAVE_IZQ);
            this.LIST_DECLARATION_GLOBAL();

            arrayDecla = this.lista_Declaraciones_Global;

            this.match(Tipo.LLAVE_DER);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_INTERFACE) {
            cla_int = this.preanalisis.getLexema();
            column = this.preanalisis.getColumna() - 7;
            this.match(Tipo.RESERVADA_INTERFACE);
            id = this.preanalisis.getLexema();
            this.match(Tipo.IDENTIFICADOR);
            this.match(Tipo.LLAVE_IZQ);
            this.DEFINITION_FUNCTIONS();

            arrayDecla = this.lista_Definition_F;

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

        /***************************/
        return new Class_Interface("public", cla_int, id, arrayDecla, column);
        /***************************/
    }
    /***********************************************************************************/

    private LIST_DECLARATION_GLOBAL() {
        /*****************************/
        var declaracion_g: Template_Instruccion;
        /*****************************/
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC) {

            declaracion_g = this.DECLARATION_GLOBAL();

            /**********************************/
            this.lista_Declaraciones_Global.push(declaracion_g);
            /**********************************/

            this.LIST_DECLARATION_GLOBAL();
        }
    }

    private DECLARATION_GLOBAL(): Template_Instruccion {
        /*****************************/
        var declaracion_g: Template_Instruccion;
        /*****************************/
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR) {

            declaracion_g = this.DECLARATION();
            this.lista_Decla_Asign = [];

            this.match(Tipo.PUNTO_Y_COMA);
        } else if (this.preanalisis.getTipo() == Tipo.IDENTIFICADOR) {

            declaracion_g = this.ASIGNATION();
            /******************/
            this.expresion = "";
            /******************/

            this.match(Tipo.PUNTO_Y_COMA);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC) {

            declaracion_g = this.METHOD();
            this.lista_Parametros = [];
            this.lista_Sentencias = [];

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
            /*****************************************/
            declaracion_g = new Declaration("", [], 0);
            /*****************************************/
        }

        return declaracion_g;
    }

    private DEFINITION_FUNCTIONS() {
        /*********************************/
        let columnD = 0;
        let tipo = "";
        let idDefi = "";
        let defiFunt: Template_Instruccion;
        /*********************************/
        columnD = this.preanalisis.getColumna();
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_PUBLIC) {
            this.match(Tipo.RESERVADA_PUBLIC);
            tipo = this.preanalisis.getLexema();
            this.TYPE_METHOD();
            idDefi = this.preanalisis.getLexema();
            this.match(Tipo.IDENTIFICADOR);
            this.match(Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS();
            this.match(Tipo.PARENTESIS_DER);
            this.match(Tipo.PUNTO_Y_COMA);

            defiFunt = new Method("public", tipo, idDefi, this.lista_Parametros, null, columnD);

            /****************/
            this.lista_Parametros = [];
            /****************/

            this.lista_Definition_F.push(defiFunt);

            this.DEFINITION_FUNCTIONS();
        }
    }
    /***********************************************************************************/

    private DECLARATION(): Template_Instruccion {
        /*****************************/
        let tipo = "";
        let columDeclaration = 0;
        /*****************************/

        tipo = this.preanalisis.getLexema();
        columDeclaration = this.preanalisis.getColumna();
        this.TYPE_DATA();
        this.LIST_DECLA_ASIGN();

        /*****************************/
        return new Declaration(tipo, this.lista_Decla_Asign, columDeclaration);
        /*****************************/
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
        /******************************/
        let decla_asign: Template_Instruccion;
        /******************************/
        this.match(Tipo.IDENTIFICADOR);
        decla_asign = this.DECLA_ASIGN_P();
        this.expresion = "";
        /********************************/
        this.lista_Decla_Asign.push(decla_asign);
        /********************************/
    }

    private DECLA_ASIGN_P(): Template_Instruccion {
        /********************************/
        let idAsign = "";
        let columnAsign = 0;
        /********************************/
        idAsign = this.listaTokens[this.numPreanalisis - 1].getLexema();
        columnAsign = this.listaTokens[this.numPreanalisis - 1].getColumna();
        if (this.preanalisis.getTipo() == Tipo.SIGNO_IGUAL) {
            this.match(Tipo.SIGNO_IGUAL);
            this.EXPRESSION();

            return new Asignation(idAsign, this.expresion, false, columnAsign);
        }

        return new Identifier(idAsign, null, Type_Operation.IDENTIFICADOR, false, 1);
    }

    /***********************************************************************************/

    private ASIGNATION(): Template_Instruccion {
        this.match(Tipo.IDENTIFICADOR);
        return this.ASIGNATION_P();
    }

    private ASIGNATION_P(): Template_Instruccion {
        /********************************/
        let idAsign = "";
        let columnAsign = 0;
        /********************************/
        idAsign = this.listaTokens[this.numPreanalisis - 1].getLexema();
        columnAsign = this.listaTokens[this.numPreanalisis - 1].getColumna();
        if (this.preanalisis.getTipo() == Tipo.SIGNO_IGUAL) {
            this.match(Tipo.SIGNO_IGUAL);
            this.EXPRESSION();

            return new Asignation(idAsign, this.expresion, true, columnAsign);

        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_POS_INCREMENTO) {
            this.match(Tipo.SIGNO_POS_INCREMENTO);

            return new Identifier(idAsign, null, Type_Operation.POS_INCREMENTO, false, columnAsign);

        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_POS_DECREMENTO) {
            this.match(Tipo.SIGNO_POS_DECREMENTO);

            return new Identifier(idAsign, null, Type_Operation.POS_DECREMENTO, false, columnAsign);

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

            return new Declaration("", [], 0);
        }
    }

    private ASIGNATION_LOCAL(): Template_Instruccion {
        this.match(Tipo.IDENTIFICADOR);
        return this.ASIGNATION_LOCAL_P();
    }

    private ASIGNATION_LOCAL_P(): Template_Instruccion {
        /********************************/
        let idAsign = "";
        let columnAsign = 0;
        /********************************/
        idAsign = this.listaTokens[this.numPreanalisis - 1].getLexema();
        columnAsign = this.listaTokens[this.numPreanalisis - 1].getColumna();
        if (this.preanalisis.getTipo() == Tipo.SIGNO_IGUAL || this.preanalisis.getTipo() == Tipo.SIGNO_POS_INCREMENTO
            || this.preanalisis.getTipo() == Tipo.SIGNO_POS_DECREMENTO) {

            return this.ASIGNATION_P();

        } else if (this.preanalisis.getTipo() == Tipo.PARENTESIS_IZQ) {
            this.match(Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS_EXPRESSION();
            this.match(Tipo.PARENTESIS_DER);

            return new Identifier(idAsign, this.expresion, Type_Operation.LLAMADA_METODO, true, columnAsign);

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
            return new Declaration("", [], 0);
        }
    }

    private LIST_PARAMETROS_EXPRESSION() {
        if (this.preanalisis.getTipo() == Tipo.NUMERO_ENTERO || this.preanalisis.getTipo() == Tipo.NUMERO_DECIMAL
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FALSE || this.preanalisis.getTipo() == Tipo.RESERVADA_TRUE
            || this.preanalisis.getTipo() == Tipo.CADENA_STRING || this.preanalisis.getTipo() == Tipo.CADENA_CHAR
            || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR || this.preanalisis.getTipo() == Tipo.SIGNO_MENOS
            || this.preanalisis.getTipo() == Tipo.SIGNO_NOT || this.preanalisis.getTipo() == Tipo.PARENTESIS_IZQ) {
            this.EXPRESSIONS();
        }
    }

    private EXPRESSIONS() {

        this.EXPRESSION();
        this.EXPRESSIONS_P();
    }

    private EXPRESSIONS_P() {
        if (this.preanalisis.getTipo() == Tipo.COMA) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Tipo.COMA);
            this.EXPRESSION();
            this.EXPRESSIONS_P();
        }
    }

    /***********************************************************************************/

    private METHOD(): Template_Instruccion {
        this.match(Tipo.RESERVADA_PUBLIC);
        return this.METHOD_P();
    }

    private METHOD_P(): Template_Instruccion {
        /********************************/
        let columnMethod = 0;
        let tipo = "";
        let idMethod = "";
        /********************************/
        columnMethod = this.listaTokens[this.numPreanalisis - 1].getColumna();
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

            return new Method("public", "void", "main", null, this.lista_Sentencias, columnMethod);
        } else {
            tipo = this.preanalisis.getLexema();
            this.TYPE_METHOD();
            idMethod = this.preanalisis.getLexema();
            this.match(Tipo.IDENTIFICADOR);
            this.match(Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS();
            this.match(Tipo.PARENTESIS_DER);
            this.BLOQUE_SENTENCIAS();

            return new Method("public", tipo, idMethod, this.lista_Parametros, this.lista_Sentencias, columnMethod);
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
        /*********************/
        let parametro: Template_Instruccion;
        /*********************/
        parametro = this.PARAMETRO();

        this.lista_Parametros.push(parametro);

        this.PARAMETROS_P();
    }

    private PARAMETROS_P() {
        /*********************/
        let parametro: Template_Instruccion;
        /*********************/
        if (this.preanalisis.getTipo() == Tipo.COMA) {
            this.match(Tipo.COMA);

            parametro = this.PARAMETRO();

            this.lista_Parametros.push(parametro);

            this.PARAMETROS_P();
        }
    }

    private PARAMETRO(): Template_Instruccion {
        /***************************/
        let tipo = "";
        let idParameter = "";
        /***************************/
        tipo = this.preanalisis.getLexema();
        this.TYPE_DATA();
        idParameter = this.preanalisis.getLexema();
        this.match(Tipo.IDENTIFICADOR);

        return new Parameter(tipo, idParameter);
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
        /*****************************/
        var sentencia_l: Template_Instruccion;
        /*****************************/
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Tipo.RESERVADA_SYSTEM) {

            sentencia_l = this.SENTENCIAS();

            /*****************************/
            this.lista_Sentencias.push(sentencia_l);
            /*****************************/

            this.LIST_SENTENCIAS();
        }
    }

    private SENTENCIAS(): Template_Instruccion {
        /*****************************/
        var sentencia_l: Template_Instruccion;
        /*****************************/
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR) {

            sentencia_l = this.DECLARATION();
            this.lista_Decla_Asign = [];

            this.match(Tipo.PUNTO_Y_COMA);
        } else if (this.preanalisis.getTipo() == Tipo.IDENTIFICADOR) {

            sentencia_l = this.ASIGNATION_LOCAL();
            /******************/
            this.expresion = "";
            /******************/

            this.match(Tipo.PUNTO_Y_COMA);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_FOR) {

            this.FOR();
            sentencia_l = new Return_Continue_Break("", null, false, 1);

        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_WHILE) {

            sentencia_l = this.WHILE();
            this.lista_Bloque_Ciclo = [];
            this.expresion = "";

        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_DO) {

            this.DO_WHILE();
            sentencia_l = new Return_Continue_Break("", null, false, 1);

        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_IF) {

            this.IF();

            sentencia_l = new Return_Continue_Break("", null, false, 1);

        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_RETURN) {

            sentencia_l = this.RETURN();
            this.expresion = "";

        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_SYSTEM) {

            sentencia_l = this.PRINT();
            this.expresion = "";
        }
        return sentencia_l;
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
        /*****************************/
        var sentencia_c: Template_Instruccion;
        /*****************************/
        sentencia_c = this.SENTENCIAS_CICLO();

        /*****************************/
        this.lista_Bloque_Ciclo.push(sentencia_c);
        /*****************************/

        this.LIST_SENTENCIAS_CICLO_P();
    }

    private LIST_SENTENCIAS_CICLO_P() {
        /*****************************/
        var sentencia_c: Template_Instruccion;
        /*****************************/
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Tipo.RESERVADA_SYSTEM
            || this.preanalisis.getTipo() == Tipo.RESERVADA_BREAK || this.preanalisis.getTipo() == Tipo.RESERVADA_CONTINUE) {

            sentencia_c = this.SENTENCIAS_CICLO();

            /*****************************/
            this.lista_Bloque_Ciclo.push(sentencia_c);
            /*****************************/

            this.LIST_SENTENCIAS_CICLO_P();
        }
    }

    private SENTENCIAS_CICLO(): Template_Instruccion {
        /*********************/
        let columnS_C = 0;
        /*********************/
        columnS_C = this.preanalisis.getColumna();
        if (this.preanalisis.getTipo() == Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Tipo.RESERVADA_SYSTEM) {
            return this.SENTENCIAS();
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_BREAK) {
            this.match(Tipo.RESERVADA_BREAK);
            this.match(Tipo.PUNTO_Y_COMA);

            return new Return_Continue_Break("break", null, false, columnS_C);

        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_CONTINUE) {
            this.match(Tipo.RESERVADA_CONTINUE);
            this.match(Tipo.PUNTO_Y_COMA);

            return new Return_Continue_Break("continue", null, false, columnS_C);
        }
    }

    /***********************************************************************************/

    private WHILE(): Template_Instruccion {
        /********************************/
        let columnWhile = 0;
        /********************************/
        columnWhile = this.preanalisis.getColumna();
        this.match(Tipo.RESERVADA_WHILE);
        this.match(Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Tipo.PARENTESIS_DER);
        this.BLOQUE_CICLO();

        return new While(this.expresion, this.lista_Bloque_Ciclo, columnWhile);
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

    private RETURN(): Template_Instruccion {
        /********************************/
        let columnReturn = 0;
        /********************************/
        this.match(Tipo.RESERVADA_RETURN);
        this.RETURN_P();
        this.match(Tipo.PUNTO_Y_COMA);

        return new Return_Continue_Break("return", this.expresion, true, columnReturn);
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

    private PRINT(): Template_Instruccion {
        /********************************/
        let columnPrint = 0;
        let tipoPrint = "";
        /********************************/
        columnPrint = this.preanalisis.getColumna();
        this.match(Tipo.RESERVADA_SYSTEM);
        this.match(Tipo.PUNTO);
        this.match(Tipo.RESERVADA_OUT);
        this.match(Tipo.PUNTO);
        tipoPrint = this.preanalisis.getLexema();
        this.PRINT_P();
        this.match(Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Tipo.PARENTESIS_DER);
        this.match(Tipo.PUNTO_Y_COMA);

        return new Print(tipoPrint, this.expresion, columnPrint);
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

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.SIGNO_MAS);
            this.T();
            this.E_P();
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_MENOS) {

            this.expresion += " " + this.preanalisis.getLexema();
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

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.SIGNO_POR);
            this.L();
            this.T_P();
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_DIVISION) {

            this.expresion += " " + this.preanalisis.getLexema();

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

            this.expresion += " and";

            this.match(Tipo.SIGNO_AND);
            this.R();
            this.L_P();
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_OR) {

            this.expresion += " or";
            this.match(Tipo.SIGNO_OR);
            this.R();
            this.L_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_XOR) {

            this.expresion += " xor";
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

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.SIGNO_MENOR_QUE);
            this.F();
            this.R_P();
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_MAYOR_QUE) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.SIGNO_MAYOR_QUE);
            this.F();
            this.R_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_MENOR_IGUAL_QUE) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.SIGNO_MENOR_IGUAL_QUE);
            this.F();
            this.R_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_MAYOR_IGUAL_QUE) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.SIGNO_MAYOR_IGUAL_QUE);
            this.F();
            this.R_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_DOBLE_IGUAL) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.SIGNO_DOBLE_IGUAL);
            this.F();
            this.R_P();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_DIFERENTE_DE) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.SIGNO_DIFERENTE_DE);
            this.F();
            this.R_P();
        }
    }

    private F() {
        if (this.preanalisis.getTipo() == Tipo.PARENTESIS_IZQ) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.PARENTESIS_IZQ);
            this.EXPRESSION();

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.PARENTESIS_DER);
        }
        else if (this.preanalisis.getTipo() == Tipo.SIGNO_NOT) {

            this.expresion += " not";

            this.match(Tipo.SIGNO_NOT);
            this.EXPRESSION();
        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_MENOS) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.SIGNO_MENOS);
            this.EXPRESSION();
        } else {
            this.PRIMITIVO();
        }

    }

    private PRIMITIVO() {
        if (this.preanalisis.getTipo() == Tipo.NUMERO_ENTERO) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.NUMERO_ENTERO);
        }
        else if (this.preanalisis.getTipo() == Tipo.NUMERO_DECIMAL) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.NUMERO_DECIMAL);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_FALSE) {

            this.expresion += " False";

            this.match(Tipo.RESERVADA_FALSE);
        } else if (this.preanalisis.getTipo() == Tipo.RESERVADA_TRUE) {

            this.expresion += " True";

            this.match(Tipo.RESERVADA_TRUE);
        } else if (this.preanalisis.getTipo() == Tipo.CADENA_STRING) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.CADENA_STRING);
        } else if (this.preanalisis.getTipo() == Tipo.CADENA_CHAR) {

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.CADENA_CHAR);
        } else if (this.preanalisis.getTipo() == Tipo.IDENTIFICADOR) {

            this.expresion += " " + this.preanalisis.getLexema();

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

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.PARENTESIS_IZQ);

            this.LIST_PARAMETROS_EXPRESSION();

            this.expresion += " " + this.preanalisis.getLexema();

            this.match(Tipo.PARENTESIS_DER);

        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_POS_INCREMENTO) {

            this.expresion += " += 1";
            this.match(Tipo.SIGNO_POS_INCREMENTO);

        } else if (this.preanalisis.getTipo() == Tipo.SIGNO_POS_DECREMENTO) {

            this.expresion += " -= 1";
            this.match(Tipo.SIGNO_POS_DECREMENTO);
        }
    }

    /***********************************************************************************/
    private match(p: Tipo) {
        if (this.preanalisis.getTipo() == Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Tipo.COMENTARIO_LINEA) {
            while (this.preanalisis.getTipo() == Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Tipo.COMENTARIO_LINEA) {
                this.numPreanalisis += 1;
                this.preanalisis = this.listaTokens[this.numPreanalisis];
            }
        }

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