"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Abstrac_Sintactic_Tree_1 = require("../AST/Abstrac_Sintactic_Tree");
const Asignation_1 = require("../AST/Declaration-Definition-Global/Asignation");
const Declaration_1 = require("../AST/Declaration-Definition-Global/Declaration");
const Identifier_1 = require("../AST/Declaration-Definition-Global/Identifier");
const Method_1 = require("../AST/Declaration-Definition-Global/Method");
const Parameter_1 = require("../AST/Declaration-Definition-Global/Parameter");
const Class_Interface_1 = require("../AST/Instructions/Class_Interface");
const Print_1 = require("../AST/Sentences/Print");
const Return_Continue_Break_1 = require("../AST/Sentences/Return_Continue_Break");
const While_1 = require("../AST/Sentences/While");
const Types_1 = require("../AST/Types");
const Token_1 = require("./Token");
const Token_Error_1 = require("./Token_Error");
class Analizador_Sintactico {
    constructor() {
        this.errorSintactico = false;
        /** RECOLECTOR DE EXPRESION **/
        this.expresion = "";
        this.lista_Instrucciones = [];
        this.lista_Decla_Asign = [];
        this.lista_Declaraciones_Global = [];
        this.lista_Parametros = [];
        this.lista_Sentencias = [];
        this.lista_Definition_F = [];
        this.lista_Bloque_Ciclo = [];
    }
    parsear(lista, listE) {
        this.listaTokens = lista;
        this.listaErrores = listE;
        this.preanalisis = this.listaTokens[0];
        this.numPreanalisis = 0;
        this.INICIO();
        /***********************************************************/
        let ast = new Abstrac_Sintactic_Tree_1.Abstrac_Sintactic_Tree(this.lista_Instrucciones);
        return ast;
        /***********************************************************/
    }
    INICIO() {
        this.LIST_INSTRUCTIONS();
    }
    LIST_INSTRUCTIONS() {
        this.INSTRUCTION();
        this.LIST_INSTRUCTIONS_P();
    }
    INSTRUCTION() {
        /*******************************/
        var instruccion;
        /*******************************/
        this.match(Token_1.Tipo.RESERVADA_PUBLIC);
        instruccion = this.INSTRUCTIONS_P();
        this.lista_Declaraciones_Global = [];
        this.lista_Definition_F = [];
        /****************************************/
        this.lista_Instrucciones.push(instruccion);
        /****************************************/
    }
    LIST_INSTRUCTIONS_P() {
        if (this.preanalisis.getTipo() != Token_1.Tipo.LLAVE_DER && this.preanalisis.getTipo() != Token_1.Tipo.ULTIMO) {
            this.INSTRUCTION();
            this.LIST_INSTRUCTIONS_P();
        }
    }
    INSTRUCTIONS_P() {
        /**************************/
        var cla_int = "";
        var id = "";
        var arrayDecla = [];
        var column = 0;
        /**************************/
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CLASS) {
            cla_int = this.preanalisis.getLexema();
            column = this.preanalisis.getColumna() - 7;
            this.match(Token_1.Tipo.RESERVADA_CLASS);
            id = this.preanalisis.getLexema();
            this.match(Token_1.Tipo.IDENTIFICADOR);
            this.match(Token_1.Tipo.LLAVE_IZQ);
            this.LIST_DECLARATION_GLOBAL();
            arrayDecla = this.lista_Declaraciones_Global;
            this.match(Token_1.Tipo.LLAVE_DER);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INTERFACE) {
            cla_int = this.preanalisis.getLexema();
            column = this.preanalisis.getColumna() - 7;
            this.match(Token_1.Tipo.RESERVADA_INTERFACE);
            id = this.preanalisis.getLexema();
            this.match(Token_1.Tipo.IDENTIFICADOR);
            this.match(Token_1.Tipo.LLAVE_IZQ);
            this.DEFINITION_FUNCTIONS();
            arrayDecla = this.lista_Definition_F;
            this.match(Token_1.Tipo.LLAVE_DER);
        }
        else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ class, interface ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba class, interface", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Token_1.Tipo.LLAVE_DER);
            }
            else {
                this.errorSintactico = true;
                this.match(Token_1.Tipo.LLAVE_DER);
            }
        }
        /***************************/
        return new Class_Interface_1.Class_Interface("public", cla_int, id, arrayDecla, column);
        /***************************/
    }
    /***********************************************************************************/
    LIST_DECLARATION_GLOBAL() {
        /*****************************/
        var declaracion_g;
        /*****************************/
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_PUBLIC) {
            declaracion_g = this.DECLARATION_GLOBAL();
            /**********************************/
            this.lista_Declaraciones_Global.push(declaracion_g);
            /**********************************/
            this.LIST_DECLARATION_GLOBAL();
        }
    }
    DECLARATION_GLOBAL() {
        /*****************************/
        var declaracion_g;
        /*****************************/
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CHAR) {
            declaracion_g = this.DECLARATION();
            this.lista_Decla_Asign = [];
            this.match(Token_1.Tipo.PUNTO_Y_COMA);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR) {
            declaracion_g = this.ASIGNATION();
            /******************/
            this.expresion = "";
            /******************/
            this.match(Token_1.Tipo.PUNTO_Y_COMA);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_PUBLIC) {
            declaracion_g = this.METHOD();
            this.lista_Parametros = [];
            this.lista_Sentencias = [];
        }
        else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ Declaracion global ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba Declaracion global", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            else {
                this.errorSintactico = true;
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            /*****************************************/
            declaracion_g = new Declaration_1.Declaration("", [], 0);
            /*****************************************/
        }
        return declaracion_g;
    }
    DEFINITION_FUNCTIONS() {
        /*********************************/
        let columnD = 0;
        let tipo = "";
        let idDefi = "";
        let defiFunt;
        /*********************************/
        columnD = this.preanalisis.getColumna();
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_PUBLIC) {
            this.match(Token_1.Tipo.RESERVADA_PUBLIC);
            tipo = this.preanalisis.getLexema();
            this.TYPE_METHOD();
            idDefi = this.preanalisis.getLexema();
            this.match(Token_1.Tipo.IDENTIFICADOR);
            this.match(Token_1.Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS();
            this.match(Token_1.Tipo.PARENTESIS_DER);
            this.match(Token_1.Tipo.PUNTO_Y_COMA);
            defiFunt = new Method_1.Method("public", tipo, idDefi, this.lista_Parametros, null, columnD);
            /****************/
            this.lista_Parametros = [];
            /****************/
            this.lista_Definition_F.push(defiFunt);
            this.DEFINITION_FUNCTIONS();
        }
    }
    /***********************************************************************************/
    DECLARATION() {
        /*****************************/
        let tipo = "";
        let columDeclaration = 0;
        /*****************************/
        tipo = this.preanalisis.getLexema();
        columDeclaration = this.preanalisis.getColumna();
        this.TYPE_DATA();
        this.LIST_DECLA_ASIGN();
        /*****************************/
        return new Declaration_1.Declaration(tipo, this.lista_Decla_Asign, columDeclaration);
        /*****************************/
    }
    TYPE_DATA() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INT) {
            this.match(Token_1.Tipo.RESERVADA_INT);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BOOLEAN) {
            this.match(Token_1.Tipo.RESERVADA_BOOLEAN);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DOUBLE) {
            this.match(Token_1.Tipo.RESERVADA_DOUBLE);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STRING) {
            this.match(Token_1.Tipo.RESERVADA_STRING);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CHAR) {
            this.match(Token_1.Tipo.RESERVADA_CHAR);
        }
        else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ Tipo de dato ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba Tipo de dato", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
        }
    }
    LIST_DECLA_ASIGN() {
        this.DECLA_ASIGN();
        this.LIST_DECLA_ASIGN_P();
    }
    LIST_DECLA_ASIGN_P() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.COMA) {
            this.match(Token_1.Tipo.COMA);
            this.DECLA_ASIGN();
            this.LIST_DECLA_ASIGN_P();
        }
    }
    DECLA_ASIGN() {
        /******************************/
        let decla_asign;
        /******************************/
        this.match(Token_1.Tipo.IDENTIFICADOR);
        decla_asign = this.DECLA_ASIGN_P();
        this.expresion = "";
        /********************************/
        this.lista_Decla_Asign.push(decla_asign);
        /********************************/
    }
    DECLA_ASIGN_P() {
        /********************************/
        let idAsign = "";
        let columnAsign = 0;
        /********************************/
        idAsign = this.listaTokens[this.numPreanalisis - 1].getLexema();
        columnAsign = this.listaTokens[this.numPreanalisis - 1].getColumna();
        if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_IGUAL) {
            this.match(Token_1.Tipo.SIGNO_IGUAL);
            this.EXPRESSION();
            return new Asignation_1.Asignation(idAsign, this.expresion, false, columnAsign);
        }
        return new Identifier_1.Identifier(idAsign, null, Types_1.Type_Operation.IDENTIFICADOR, false, 1);
    }
    /***********************************************************************************/
    ASIGNATION() {
        this.match(Token_1.Tipo.IDENTIFICADOR);
        return this.ASIGNATION_P();
    }
    ASIGNATION_P() {
        /********************************/
        let idAsign = "";
        let columnAsign = 0;
        /********************************/
        idAsign = this.listaTokens[this.numPreanalisis - 1].getLexema();
        columnAsign = this.listaTokens[this.numPreanalisis - 1].getColumna();
        if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_IGUAL) {
            this.match(Token_1.Tipo.SIGNO_IGUAL);
            this.EXPRESSION();
            return new Asignation_1.Asignation(idAsign, this.expresion, true, columnAsign);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_POS_INCREMENTO) {
            this.match(Token_1.Tipo.SIGNO_POS_INCREMENTO);
            return new Identifier_1.Identifier(idAsign, null, Types_1.Type_Operation.POS_INCREMENTO, false, columnAsign);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_POS_DECREMENTO) {
            this.match(Token_1.Tipo.SIGNO_POS_DECREMENTO);
            return new Identifier_1.Identifier(idAsign, null, Types_1.Type_Operation.POS_DECREMENTO, false, columnAsign);
        }
        else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ =, ++, -- ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba =, ++, --", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            return new Declaration_1.Declaration("", [], 0);
        }
    }
    ASIGNATION_LOCAL() {
        this.match(Token_1.Tipo.IDENTIFICADOR);
        return this.ASIGNATION_LOCAL_P();
    }
    ASIGNATION_LOCAL_P() {
        /********************************/
        let idAsign = "";
        let columnAsign = 0;
        /********************************/
        idAsign = this.listaTokens[this.numPreanalisis - 1].getLexema();
        columnAsign = this.listaTokens[this.numPreanalisis - 1].getColumna();
        if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_IGUAL || this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_POS_INCREMENTO
            || this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_POS_DECREMENTO) {
            return this.ASIGNATION_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.PARENTESIS_IZQ) {
            this.match(Token_1.Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS_EXPRESSION();
            this.match(Token_1.Tipo.PARENTESIS_DER);
            return new Identifier_1.Identifier(idAsign, this.expresion, Types_1.Type_Operation.LLAMADA_METODO, true, columnAsign);
        }
        else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ =, ++, --, ( ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba =, ++, --, (", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            return new Declaration_1.Declaration("", [], 0);
        }
    }
    LIST_PARAMETROS_EXPRESSION() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.NUMERO_ENTERO || this.preanalisis.getTipo() == Token_1.Tipo.NUMERO_DECIMAL
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_FALSE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_TRUE
            || this.preanalisis.getTipo() == Token_1.Tipo.CADENA_STRING || this.preanalisis.getTipo() == Token_1.Tipo.CADENA_CHAR
            || this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR || this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_MENOS
            || this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_NOT || this.preanalisis.getTipo() == Token_1.Tipo.PARENTESIS_IZQ) {
            this.EXPRESSIONS();
        }
    }
    EXPRESSIONS() {
        this.EXPRESSION();
        this.EXPRESSIONS_P();
    }
    EXPRESSIONS_P() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.COMA) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.COMA);
            this.EXPRESSION();
            this.EXPRESSIONS_P();
        }
    }
    /***********************************************************************************/
    METHOD() {
        this.match(Token_1.Tipo.RESERVADA_PUBLIC);
        return this.METHOD_P();
    }
    METHOD_P() {
        /********************************/
        let columnMethod = 0;
        let tipo = "";
        let idMethod = "";
        /********************************/
        columnMethod = this.listaTokens[this.numPreanalisis - 1].getColumna();
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STATIC) {
            this.match(Token_1.Tipo.RESERVADA_STATIC);
            this.match(Token_1.Tipo.RESERVADA_VOID);
            this.match(Token_1.Tipo.RESERVADA_MAIN);
            this.match(Token_1.Tipo.PARENTESIS_IZQ);
            this.match(Token_1.Tipo.RESERVADA_STRING);
            this.match(Token_1.Tipo.CORCHETE_IZQ);
            this.match(Token_1.Tipo.CORCHETE_DER);
            this.match(Token_1.Tipo.RESERVADA_ARGS);
            this.match(Token_1.Tipo.PARENTESIS_DER);
            this.BLOQUE_SENTENCIAS();
            return new Method_1.Method("public", "void", "main", null, this.lista_Sentencias, columnMethod);
        }
        else {
            tipo = this.preanalisis.getLexema();
            this.TYPE_METHOD();
            idMethod = this.preanalisis.getLexema();
            this.match(Token_1.Tipo.IDENTIFICADOR);
            this.match(Token_1.Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS();
            this.match(Token_1.Tipo.PARENTESIS_DER);
            this.BLOQUE_SENTENCIAS();
            return new Method_1.Method("public", tipo, idMethod, this.lista_Parametros, this.lista_Sentencias, columnMethod);
        }
    }
    TYPE_METHOD() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_VOID) {
            this.match(Token_1.Tipo.RESERVADA_VOID);
        }
        else {
            this.TYPE_DATA();
        }
    }
    LIST_PARAMETROS() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CHAR) {
            this.PARAMETROS();
        }
    }
    PARAMETROS() {
        /*********************/
        let parametro;
        /*********************/
        parametro = this.PARAMETRO();
        this.lista_Parametros.push(parametro);
        this.PARAMETROS_P();
    }
    PARAMETROS_P() {
        /*********************/
        let parametro;
        /*********************/
        if (this.preanalisis.getTipo() == Token_1.Tipo.COMA) {
            this.match(Token_1.Tipo.COMA);
            parametro = this.PARAMETRO();
            this.lista_Parametros.push(parametro);
            this.PARAMETROS_P();
        }
    }
    PARAMETRO() {
        /***************************/
        let tipo = "";
        let idParameter = "";
        /***************************/
        tipo = this.preanalisis.getLexema();
        this.TYPE_DATA();
        idParameter = this.preanalisis.getLexema();
        this.match(Token_1.Tipo.IDENTIFICADOR);
        return new Parameter_1.Parameter(tipo, idParameter);
    }
    BLOQUE_SENTENCIAS() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.LLAVE_IZQ) {
            this.match(Token_1.Tipo.LLAVE_IZQ);
            this.LIST_SENTENCIAS();
            this.match(Token_1.Tipo.LLAVE_DER);
        }
        else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ { ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba {", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
        }
    }
    /***********************************************************************************/
    LIST_SENTENCIAS() {
        /*****************************/
        var sentencia_l;
        /*****************************/
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_SYSTEM) {
            sentencia_l = this.SENTENCIAS();
            /*****************************/
            this.lista_Sentencias.push(sentencia_l);
            /*****************************/
            this.LIST_SENTENCIAS();
        }
    }
    SENTENCIAS() {
        /*****************************/
        var sentencia_l;
        /*****************************/
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CHAR) {
            sentencia_l = this.DECLARATION();
            this.lista_Decla_Asign = [];
            this.match(Token_1.Tipo.PUNTO_Y_COMA);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR) {
            sentencia_l = this.ASIGNATION_LOCAL();
            /******************/
            this.expresion = "";
            /******************/
            this.match(Token_1.Tipo.PUNTO_Y_COMA);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_FOR) {
            this.FOR();
            sentencia_l = new Return_Continue_Break_1.Return_Continue_Break("", null, false, 1);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_WHILE) {
            sentencia_l = this.WHILE();
            this.lista_Bloque_Ciclo = [];
            this.expresion = "";
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DO) {
            this.DO_WHILE();
            sentencia_l = new Return_Continue_Break_1.Return_Continue_Break("", null, false, 1);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_IF) {
            this.IF();
            sentencia_l = new Return_Continue_Break_1.Return_Continue_Break("", null, false, 1);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_RETURN) {
            sentencia_l = this.RETURN();
            this.expresion = "";
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_SYSTEM) {
            sentencia_l = this.PRINT();
            this.expresion = "";
        }
        return sentencia_l;
    }
    /***********************************************************************************/
    FOR() {
        this.match(Token_1.Tipo.RESERVADA_FOR);
        this.match(Token_1.Tipo.PARENTESIS_IZQ);
        this.DECLARATION();
        this.match(Token_1.Tipo.PUNTO_Y_COMA);
        this.EXPRESSION();
        this.match(Token_1.Tipo.PUNTO_Y_COMA);
        this.EXPRESSION();
        this.match(Token_1.Tipo.PARENTESIS_DER);
        this.BLOQUE_CICLO();
    }
    BLOQUE_CICLO() {
        this.match(Token_1.Tipo.LLAVE_IZQ);
        this.BLOQUE_CICLO_P();
        this.match(Token_1.Tipo.LLAVE_DER);
    }
    BLOQUE_CICLO_P() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_SYSTEM
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BREAK || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CONTINUE) {
            this.LIST_SENTENCIAS_CICLO();
        }
    }
    LIST_SENTENCIAS_CICLO() {
        /*****************************/
        var sentencia_c;
        /*****************************/
        sentencia_c = this.SENTENCIAS_CICLO();
        /*****************************/
        this.lista_Bloque_Ciclo.push(sentencia_c);
        /*****************************/
        this.LIST_SENTENCIAS_CICLO_P();
    }
    LIST_SENTENCIAS_CICLO_P() {
        /*****************************/
        var sentencia_c;
        /*****************************/
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_SYSTEM
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BREAK || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CONTINUE) {
            sentencia_c = this.SENTENCIAS_CICLO();
            /*****************************/
            this.lista_Bloque_Ciclo.push(sentencia_c);
            /*****************************/
            this.LIST_SENTENCIAS_CICLO_P();
        }
    }
    SENTENCIAS_CICLO() {
        /*********************/
        let columnS_C = 0;
        /*********************/
        columnS_C = this.preanalisis.getColumna();
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_INT || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BOOLEAN
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DOUBLE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_STRING
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CHAR || this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_FOR || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_WHILE
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_DO || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_IF
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_RETURN || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_SYSTEM) {
            return this.SENTENCIAS();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_BREAK) {
            this.match(Token_1.Tipo.RESERVADA_BREAK);
            this.match(Token_1.Tipo.PUNTO_Y_COMA);
            return new Return_Continue_Break_1.Return_Continue_Break("break", null, false, columnS_C);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_CONTINUE) {
            this.match(Token_1.Tipo.RESERVADA_CONTINUE);
            this.match(Token_1.Tipo.PUNTO_Y_COMA);
            return new Return_Continue_Break_1.Return_Continue_Break("continue", null, false, columnS_C);
        }
    }
    /***********************************************************************************/
    WHILE() {
        /********************************/
        let columnWhile = 0;
        /********************************/
        columnWhile = this.preanalisis.getColumna();
        this.match(Token_1.Tipo.RESERVADA_WHILE);
        this.match(Token_1.Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Token_1.Tipo.PARENTESIS_DER);
        this.BLOQUE_CICLO();
        return new While_1.While(this.expresion, this.lista_Bloque_Ciclo, columnWhile);
    }
    /***********************************************************************************/
    DO_WHILE() {
        this.match(Token_1.Tipo.RESERVADA_DO);
        this.BLOQUE_CICLO();
        this.match(Token_1.Tipo.RESERVADA_WHILE);
        this.match(Token_1.Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Token_1.Tipo.PARENTESIS_DER);
        this.match(Token_1.Tipo.PUNTO_Y_COMA);
    }
    /***********************************************************************************/
    IF() {
        this.match(Token_1.Tipo.RESERVADA_IF);
        this.match(Token_1.Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Token_1.Tipo.PARENTESIS_DER);
        this.BLOQUE_CICLO();
        this.ELSE();
    }
    ELSE() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_ELSE) {
            this.match(Token_1.Tipo.RESERVADA_ELSE);
            this.ELSE_IF();
        }
    }
    ELSE_IF() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_IF) {
            this.IF();
        }
        else {
            this.BLOQUE_CICLO();
        }
    }
    /***********************************************************************************/
    RETURN() {
        /********************************/
        let columnReturn = 0;
        /********************************/
        this.match(Token_1.Tipo.RESERVADA_RETURN);
        this.RETURN_P();
        this.match(Token_1.Tipo.PUNTO_Y_COMA);
        return new Return_Continue_Break_1.Return_Continue_Break("return", this.expresion, true, columnReturn);
    }
    RETURN_P() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.NUMERO_ENTERO || this.preanalisis.getTipo() == Token_1.Tipo.NUMERO_DECIMAL
            || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_FALSE || this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_TRUE
            || this.preanalisis.getTipo() == Token_1.Tipo.CADENA_STRING || this.preanalisis.getTipo() == Token_1.Tipo.CADENA_CHAR
            || this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR || this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_MENOS
            || this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_NOT || this.preanalisis.getTipo() == Token_1.Tipo.PARENTESIS_IZQ) {
            this.EXPRESSION();
        }
    }
    /***********************************************************************************/
    PRINT() {
        /********************************/
        let columnPrint = 0;
        let tipoPrint = "";
        /********************************/
        columnPrint = this.preanalisis.getColumna();
        this.match(Token_1.Tipo.RESERVADA_SYSTEM);
        this.match(Token_1.Tipo.PUNTO);
        this.match(Token_1.Tipo.RESERVADA_OUT);
        this.match(Token_1.Tipo.PUNTO);
        tipoPrint = this.preanalisis.getLexema();
        this.PRINT_P();
        this.match(Token_1.Tipo.PARENTESIS_IZQ);
        this.EXPRESSION();
        this.match(Token_1.Tipo.PARENTESIS_DER);
        this.match(Token_1.Tipo.PUNTO_Y_COMA);
        return new Print_1.Print(tipoPrint, this.expresion, columnPrint);
    }
    PRINT_P() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_PRINTLN) {
            this.match(Token_1.Tipo.RESERVADA_PRINTLN);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_PRINT) {
            this.match(Token_1.Tipo.RESERVADA_PRINT);
        }
        else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ print, println ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba print, println", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
        }
    }
    /***********************************************************************************/
    EXPRESSION() {
        this.T();
        this.E_P();
    }
    E_P() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_MAS) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_MAS);
            this.T();
            this.E_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_MENOS) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_MENOS);
            this.T();
            this.E_P();
        }
    }
    T() {
        this.L();
        this.T_P();
    }
    T_P() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_POR) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_POR);
            this.L();
            this.T_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_DIVISION) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_DIVISION);
            this.L();
            this.T_P();
        }
    }
    L() {
        this.R();
        this.L_P();
    }
    L_P() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_AND) {
            this.expresion += " and";
            this.match(Token_1.Tipo.SIGNO_AND);
            this.R();
            this.L_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_OR) {
            this.expresion += " or";
            this.match(Token_1.Tipo.SIGNO_OR);
            this.R();
            this.L_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_XOR) {
            this.expresion += " xor";
            this.match(Token_1.Tipo.SIGNO_XOR);
            this.R();
            this.L_P();
        }
    }
    R() {
        this.F();
        this.R_P();
    }
    R_P() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_MENOR_QUE) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_MENOR_QUE);
            this.F();
            this.R_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_MAYOR_QUE) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_MAYOR_QUE);
            this.F();
            this.R_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_MENOR_IGUAL_QUE) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_MENOR_IGUAL_QUE);
            this.F();
            this.R_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_MAYOR_IGUAL_QUE) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_MAYOR_IGUAL_QUE);
            this.F();
            this.R_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_DOBLE_IGUAL) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_DOBLE_IGUAL);
            this.F();
            this.R_P();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_DIFERENTE_DE) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_DIFERENTE_DE);
            this.F();
            this.R_P();
        }
    }
    F() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.PARENTESIS_IZQ) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.PARENTESIS_IZQ);
            this.EXPRESSION();
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.PARENTESIS_DER);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_NOT) {
            this.expresion += " not";
            this.match(Token_1.Tipo.SIGNO_NOT);
            this.EXPRESSION();
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_MENOS) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.SIGNO_MENOS);
            this.EXPRESSION();
        }
        else {
            this.PRIMITIVO();
        }
    }
    PRIMITIVO() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.NUMERO_ENTERO) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.NUMERO_ENTERO);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.NUMERO_DECIMAL) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.NUMERO_DECIMAL);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_FALSE) {
            this.expresion += " False";
            this.match(Token_1.Tipo.RESERVADA_FALSE);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.RESERVADA_TRUE) {
            this.expresion += " True";
            this.match(Token_1.Tipo.RESERVADA_TRUE);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.CADENA_STRING) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.CADENA_STRING);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.CADENA_CHAR) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.CADENA_CHAR);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.IDENTIFICADOR) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.IDENTIFICADOR);
            this.INC_DEC_CALL_METHOD();
        }
        else {
            /** ERROR **/
            if (this.errorSintactico == false) {
                //console.log(">> Error sintactico se esperaba [ Primitivo ] en lugar de [" + this.preanalisis.getTipoEnString() + ", " + this.preanalisis.getLexema() + "]");
                this.addTokenError(this.preanalisis.getLexema(), "Se esperaba Primitivo", this.preanalisis.getFila(), this.preanalisis.getColumna());
                this.errorSintactico = true;
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
            else {
                this.match(Token_1.Tipo.PUNTO_Y_COMA);
            }
        }
    }
    INC_DEC_CALL_METHOD() {
        if (this.preanalisis.getTipo() == Token_1.Tipo.PARENTESIS_IZQ) {
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.PARENTESIS_IZQ);
            this.LIST_PARAMETROS_EXPRESSION();
            this.expresion += " " + this.preanalisis.getLexema();
            this.match(Token_1.Tipo.PARENTESIS_DER);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_POS_INCREMENTO) {
            this.expresion += " += 1";
            this.match(Token_1.Tipo.SIGNO_POS_INCREMENTO);
        }
        else if (this.preanalisis.getTipo() == Token_1.Tipo.SIGNO_POS_DECREMENTO) {
            this.expresion += " -= 1";
            this.match(Token_1.Tipo.SIGNO_POS_DECREMENTO);
        }
    }
    /***********************************************************************************/
    match(p) {
        if (this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_LINEA) {
            while (this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_LINEA) {
                this.numPreanalisis += 1;
                this.preanalisis = this.listaTokens[this.numPreanalisis];
            }
        }
        if (this.errorSintactico) {
            if (this.numPreanalisis < this.listaTokens.length - 1) {
                if (this.preanalisis.getTipo() == Token_1.Tipo.PUNTO_Y_COMA || this.preanalisis.getTipo() == Token_1.Tipo.LLAVE_DER) {
                    if (p == Token_1.Tipo.PUNTO_Y_COMA) {
                        this.errorSintactico = false;
                        this.numPreanalisis += 1;
                        this.preanalisis = this.listaTokens[this.numPreanalisis];
                    }
                    else if (p == Token_1.Tipo.LLAVE_DER) {
                        this.errorSintactico = false;
                        this.numPreanalisis += 1;
                        this.preanalisis = this.listaTokens[this.numPreanalisis];
                    }
                    while (this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_LINEA) {
                        this.numPreanalisis += 1;
                        this.preanalisis = this.listaTokens[this.numPreanalisis];
                    }
                }
                else {
                    while (this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_LINEA) {
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
                if (this.numPreanalisis < this.listaTokens.length) //llevaba un -1
                 {
                    this.numPreanalisis += 1;
                    this.preanalisis = this.listaTokens[this.numPreanalisis];
                    while (this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_BLOQUE || this.preanalisis.getTipo() == Token_1.Tipo.COMENTARIO_LINEA) {
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
    getTipoParaError(p) {
        switch (p) {
            case Token_1.Tipo.RESERVADA_ARGS:
                return "Reservada_Args";
            case Token_1.Tipo.RESERVADA_BOOLEAN:
                return "Reservada_Boolean";
            case Token_1.Tipo.RESERVADA_BREAK:
                return "Reservada_Break";
            case Token_1.Tipo.RESERVADA_CHAR:
                return "Reservada_Char";
            case Token_1.Tipo.RESERVADA_CLASS:
                return "Reservada_Class";
            case Token_1.Tipo.RESERVADA_CONTINUE:
                return "Reservada_Continue";
            case Token_1.Tipo.RESERVADA_DO:
                return "Reservada_Do";
            case Token_1.Tipo.RESERVADA_DOUBLE:
                return "Reservada_Double";
            case Token_1.Tipo.RESERVADA_ELSE:
                return "Reservada_Else";
            case Token_1.Tipo.RESERVADA_FALSE:
                return "Reservada_False";
            case Token_1.Tipo.RESERVADA_FOR:
                return "Reservada_For";
            case Token_1.Tipo.RESERVADA_IF:
                return "Reservada_If";
            case Token_1.Tipo.RESERVADA_INT:
                return "Reservada_Int";
            case Token_1.Tipo.RESERVADA_INTERFACE:
                return "Reservada_Interface";
            case Token_1.Tipo.RESERVADA_MAIN:
                return "Reservada_Main";
            case Token_1.Tipo.RESERVADA_OUT:
                return "Reservada_Out";
            case Token_1.Tipo.RESERVADA_PRINT:
                return "Reservada_Print";
            case Token_1.Tipo.RESERVADA_PRINTLN:
                return "Reservada_PrintLn";
            case Token_1.Tipo.RESERVADA_PUBLIC:
                return "Reservada_Public";
            case Token_1.Tipo.RESERVADA_RETURN:
                return "Reservada_Return";
            case Token_1.Tipo.RESERVADA_STATIC:
                return "Reservada_Static";
            case Token_1.Tipo.RESERVADA_STRING:
                return "Reservada_String";
            case Token_1.Tipo.RESERVADA_SYSTEM:
                return "Reservada_System";
            case Token_1.Tipo.RESERVADA_TRUE:
                return "Reservada_True";
            case Token_1.Tipo.RESERVADA_VOID:
                return "Reservada_Void";
            case Token_1.Tipo.RESERVADA_WHILE:
                return "Reservada_While";
            case Token_1.Tipo.IDENTIFICADOR:
                return "Identificador";
            case Token_1.Tipo.CADENA_STRING:
                return "Cadena_String";
            case Token_1.Tipo.CADENA_CHAR:
                return "Cadena_Char";
            case Token_1.Tipo.COMENTARIO_LINEA:
                return "Comentario_Linea";
            case Token_1.Tipo.COMENTARIO_BLOQUE:
                return "Comentario_Bloque";
            case Token_1.Tipo.NUMERO_ENTERO:
                return "NumeroEntero";
            case Token_1.Tipo.NUMERO_DECIMAL:
                return "Numero_Decimal";
            case Token_1.Tipo.LLAVE_IZQ:
                return "Llave_Izquierda";
            case Token_1.Tipo.LLAVE_DER:
                return "Llave_Derecha";
            case Token_1.Tipo.COMA:
                return "Coma";
            case Token_1.Tipo.PUNTO:
                return "Punto";
            case Token_1.Tipo.PUNTO_Y_COMA:
                return "PuntoYcoma";
            case Token_1.Tipo.CORCHETE_IZQ:
                return "Corchete_Izquierdo";
            case Token_1.Tipo.CORCHETE_DER:
                return "Corchete_Derecho";
            case Token_1.Tipo.PARENTESIS_IZQ:
                return "Parentesis_Izquierdo";
            case Token_1.Tipo.PARENTESIS_DER:
                return "Parentesis_Derecho";
            case Token_1.Tipo.SIGNO_MAS:
                return "Signo_Mas";
            case Token_1.Tipo.SIGNO_MENOS:
                return "Signo_Menos";
            case Token_1.Tipo.SIGNO_POR:
                return "Signo_Por";
            case Token_1.Tipo.SIGNO_DIVISION:
                return "Signo_Division";
            case Token_1.Tipo.SIGNO_MENOR_QUE:
                return "Signo_MenorQue";
            case Token_1.Tipo.SIGNO_MAYOR_QUE:
                return "Signo_MayorQue";
            case Token_1.Tipo.SIGNO_DIFERENTE_DE:
                return "Signo_DiferenteDe";
            case Token_1.Tipo.SIGNO_POS_INCREMENTO:
                return "Signo_PosIncremento";
            case Token_1.Tipo.SIGNO_POS_DECREMENTO:
                return "Signo_PosDecremento";
            case Token_1.Tipo.SIGNO_MAYOR_IGUAL_QUE:
                return "Signo_MayorIgualQue";
            case Token_1.Tipo.SIGNO_MENOR_IGUAL_QUE:
                return "Signo_MenorIgualQue";
            case Token_1.Tipo.SIGNO_IGUAL:
                return "Signo_Igual";
            case Token_1.Tipo.SIGNO_DOBLE_IGUAL:
                return "Signo_DobleIgual";
            case Token_1.Tipo.SIGNO_AND:
                return "Signo_AND";
            case Token_1.Tipo.SIGNO_OR:
                return "Signo_OR";
            case Token_1.Tipo.SIGNO_NOT:
                return "Signo_NOT";
            case Token_1.Tipo.SIGNO_XOR:
                return "Signo_XOR";
            case Token_1.Tipo.ULTIMO:
                return "Ultimo";
            default:
                return "Desconocido";
        }
    }
    getListaErrores() {
        return this.listaErrores;
    }
    addTokenError(caracter, descripcion, fila, columna) {
        this.listaErrores.push(new Token_Error_1.Token_Error(caracter, Token_Error_1.TipoError.SINTACTICO, descripcion, fila, columna));
    }
}
exports.Analizador_Sintactico = Analizador_Sintactico;
