%{
    const { Abstrac_Sintactic_Tree } = require('../dist/AST/Abstrac_Sintactic_Tree');
    const { Class_Interface } = require('../dist/AST/Instructions/Class_Interface');
    const { Declaration } = require('../dist/AST/Declaration-Definition-Global/Declaration');
    const { Identifier } = require('../dist/AST/Declaration-Definition-Global/Identifier');
    const { Asignation } = require('../dist/AST/Declaration-Definition-Global/Asignation');
    const { Method } = require('../dist/AST/Declaration-Definition-Global/Method');
    const { Parameter } = require('../dist/AST/Declaration-Definition-Global/Parameter');
    const { Type_Operation } = require('../dist/AST/Types');
    const { Aritmetica } = require('../dist/AST/Expressions/Aritmetica');
    const { Primitivo } = require('../dist/AST/Expressions/Primitivo');
    const { Relacional } = require('../dist/AST/Expressions/Relacional');
    const { Logica } = require('../dist/AST/Expressions/Logica');
%}

/* Definición Léxica */
%lex

%options case-sensitive

%%
\s+											// se ignoran espacios en blanco
"//".*										/* comentario simple línea*/
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			/* comentario multiple líneas*/

"public"			return 'r_public';
"class"			    return 'r_class';
"interface"		    return 'r_interface';
"void"			    return 'r_void';
"for"				return 'r_for';
"while"				return 'r_while';
"do"				return 'r_do';
"if"				return 'r_if';
"else"				return 'r_else';
"break"				return 'r_break';
"continue"			return 'r_continue';
"return"            return 'r_return';
"int"			    return 'r_int';
"double"			return 'r_double';
"String"			return 'r_String';
"char"				return 'r_char';
"boolean"			return 'r_boolean';
"true"				return 'r_true';
"false"				return 'r_false';
"static"            return 'r_static';
"main"				return 'r_main';
"args"				return 'r_args';
"System"			return 'r_System';
"out"				return 'r_out';
"println"			return 'r_println';
"print"             return 'r_print';

"{"					return 'llave_izq';
"}"					return 'llave_der';
","					return 'coma';
"."					return 'punto';
";"					return 'punto_y_coma';
"["					return 'corchete_izq';
"]"					return 'corchete_der';
"("					return 'parentesis_izq';
")"					return 'parentesis_der';

"++"				return 's_pos_incremento';
"--"				return 's_pos_decremento';
"+"					return 's_mas';
"-"					return 's_menos';
"*"					return 's_por';
"/"					return 's_division';

">="				return 's_mayor_igual_que';
"<="				return 's_menor_igual_que';
"<"					return 's_menor_que';
">"					return 's_mayor_que';
"!="				return 's_diferente_de';
"=="				return 's_doble_igual';
"="					return 's_igual';
"&&"				return 's_AND';
"||"				return 's_OR';
"!"					return 's_NOT';
"^"				    return 's_XOR';


\"[^\"]*\"	                            return 'cadena_string'; 
"'"[^']"'"				                return 'cadena_char';
[0-9]+("."[0-9]+)\b  			        return 'numero_decimal';
[0-9]+\b								return 'numero_entero';
([a-zA-Z])[a-zA-Z0-9_]*	                return 'identificador';

<<EOF>>				return 'EOF';

.					{ 
                        console.log('Este es un error LEXICO: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        
                    }

/lex


/* Asociación de operadores y precedencia */
%left 's_pos_decremento' 's_pos_incremento'
%left 's_OR'
%left 's_AND'
%left 's_XOR'
%left 's_doble_igual' 's_diferente_de'
%left 's_mayor_que' 's_menor_que' 's_menor_igual_que' 's_mayor_igual_que'
%left 's_mas' 's_menos'
%left 's_por' 's_division'
%right 'UMENOS' 'UNOT'

%start INICIO

%% /* Definición de la gramática */

INICIO
	: LIST_INSTRUCTIONS EOF {
		// Ya analizada la entrada, se retorna el objeto ast de la clase Abstrac_Sintactic_Tree
        let ast = new Abstrac_Sintactic_Tree($1);
		return ast;
	}
;

LIST_INSTRUCTIONS
    : LIST_INSTRUCTIONS INSTRUCTIONS    {$1.push($2); $$ = $1; }
    | INSTRUCTIONS                      {$$ = [$1]; }
    | error { console.error('Este es un error SINTACTICO en Instrucciones: ' + yytext + ' Linea: ' + this._$.first_line + ' Columna: ' + this._$.first_column); }
;

INSTRUCTIONS
    : r_public r_class identificador BLOCK_DECLARATION_GLOBAL       {$$ = new Class_Interface($1, $2, $3, $4, this._$.first_column); }
    | r_public r_interface identificador BLOCK_DEFINITION_FUNCTIONS {$$ = new Class_Interface($1, $2, $3, $4, this._$.first_column); }
;

BLOCK_DECLARATION_GLOBAL
    : llave_izq LIST_DECLARATION_GLOBAL llave_der   {$$ = $2; }
    | llave_izq llave_der                           {$$ = []; }
;

BLOCK_DEFINITION_FUNCTIONS
    : llave_izq LIST_DEFINITION_FUNCTIONS llave_der {$$ = $2; }
    | llave_izq llave_der                           {$$ = []; }
;

/******************************************************************************************************************/

LIST_DECLARATION_GLOBAL
    : LIST_DECLARATION_GLOBAL DECLARATION_GLOBAL    {$1.push($2); $$ = $1; }
    | DECLARATION_GLOBAL                            {$$ = [$1]; }
    | error { console.error('Este es un error SINTACTICO en Declaraciones globales: ' + yytext + ' Linea: ' + this._$.first_line + ' Columna: ' + this._$.first_column); }
;

DECLARATION_GLOBAL
    : DECLARATION punto_y_coma          {$$ = $1; }
    | ASIGNATION punto_y_coma           {$$ = $1; }
    | OTHERS_ASIGNATIONS punto_y_coma   {$$ = $1; }
    | METHOD                            {$$ = $1; }
;

LIST_DEFINITION_FUNCTIONS
    : LIST_DEFINITION_FUNCTIONS DEFINITION_FUNCTIONS    {$1.push($2); $$ = $1; }
    | DEFINITION_FUNCTIONS                              {$$ = [$1]; }
    | error { console.error('Este es un error SINTACTICO en Definicion de funciones: ' + yytext + ' Linea: ' + this._$.first_line + ' Columna: ' + this._$.first_column); }
;

DEFINITION_FUNCTIONS
    : r_public TYPE_METHOD identificador BLOCK_PARAMETROS punto_y_coma  {$$ = new Method($1, $2, $3, $4, null, this._$.first_column); }
;

/******************************************************************************************************************/

DECLARATION
    : TYPE_DATA LIST_DECLA_ASIGN    {$$ = new Declaration($1, $2, this._$.first_column); }
;

TYPE_DATA
    : r_int     {$$ = $1; }
    | r_boolean {$$ = $1; }
    | r_double  {$$ = $1; }
    | r_String  {$$ = $1; }
    | r_char    {$$ = $1; }
;

LIST_DECLA_ASIGN
    : LIST_DECLA_ASIGN coma DECLA_ASIGN {$1.push($3); $$ = $1; }
    | DECLA_ASIGN                       {$$ = [$1]; }
;

DECLA_ASIGN
    : identificador                     {$$ = new Identifier($1, null, Type_Operation.IDENTIFICADOR, false, 1); }
    | identificador s_igual EXPRESION   {$$ = new Asignation($1, $3, false, 1); }
;

/******************************************************************************************************************/

ASIGNATION
    : identificador s_igual EXPRESION   {$$ = new Asignation($1, $3, true, this._$.first_column); }
;

/******************************************************************************************************************/

OTHERS_ASIGNATIONS
    : identificador s_pos_incremento    {$$ = new Identifier($1, null, Type_Operation.POS_INCREMENTO, false, this._$.first_column); }
    | identificador s_pos_decremento    {$$ = new Identifier($1, null, Type_Operation.POS_DECREMENTO, false, this._$.first_column); }
;

/******************************************************************************************************************/

METHOD
    : r_public r_static r_void r_main parentesis_izq r_String corchete_izq corchete_der r_args parentesis_der BLOCK_SENTENCIAS  {$$ = new Method($1, $3, $4, null, $11, this._$.first_column); }
    | r_public TYPE_METHOD identificador BLOCK_PARAMETROS BLOCK_SENTENCIAS                                                      {$$ = new Method($1, $2, $3, $4, $5, this._$.first_column); }
;

TYPE_METHOD
    : r_void        {$$ = $1; }
    | TYPE_DATA     {$$ = $1; }
;

BLOCK_PARAMETROS
    : parentesis_izq LIST_PARAMETROS parentesis_der {$$ = $2; }
    | parentesis_izq parentesis_der                 {$$ = []; }
;

LIST_PARAMETROS 
    : LIST_PARAMETROS coma PARAMETROS   {$1.push($3); $$ = $1; }
    | PARAMETROS                        {$$ = [$1]; }
;

PARAMETROS
    : TYPE_DATA identificador   {$$ = new Parameter($1, $2); }
;

BLOCK_SENTENCIAS
    : llave_izq LIST_SENTENCIAS llave_der   {$$ = $2; }
    | llave_izq llave_der                   {$$ = []; }
;

/******************************************************************************************************************/

LIST_SENTENCIAS
    : LIST_SENTENCIAS SENTENCIAS    {$1.push($2); $$ = $1; }
    | SENTENCIAS                    {$$ = [$1]; }
    | error { console.error('Este es un error SINTACTICO en Sentencias: ' + yytext + ' Linea: ' + this._$.first_line + ' Columna: ' + this._$.first_column); }
;

SENTENCIAS
    : DECLARATION punto_y_coma                                  {$$ = $1; }
    | ASIGNATION punto_y_coma                                   {$$ = $1; }
    | OTHERS_ASIGNATIONS punto_y_coma                           {$$ = $1; }
    | identificador BLOCK_PARAMETROS_PRIMITIVOS punto_y_coma    {$$ = new Identifier($1, $2, Type_Operation.LLAMADA_METODO, true, this._$.first_column);}
    | FOR
    | WHILE
    | DO_WHILE
    | IF
    | RETURN
    | PRINT
;

BLOCK_PARAMETROS_PRIMITIVOS
    : parentesis_izq LIST_PARAMETROS_PRIMITIVOS parentesis_der  {$$ = $2; }
    | parentesis_izq parentesis_der                             {$$ = []; }
;

LIST_PARAMETROS_PRIMITIVOS
    : LIST_PARAMETROS_PRIMITIVOS coma PRIMITIVOS    {$1.push($3); $$ = $1; }
    | PRIMITIVOS                                    {$$ = [$1]; }
;
/******************************************************************************************************************/

FOR
    : r_for parentesis_izq DECLARATION punto_y_coma EXPRESION punto_y_coma EXPRESION parentesis_der BLOCK_CYCLE
;

BLOCK_CYCLE
    : llave_izq LIST_BLOQUE_CICLO llave_der
    | llave_izq llave_der
;

LIST_BLOQUE_CICLO
    : LIST_BLOQUE_CICLO SENTENCIAS_CICLO
    | SENTENCIAS_CICLO
    | error punto_y_coma { console.error('Este es un error SINTACTICO en Bloque ciclo ' + yytext + ' Linea: ' + this._$.first_line + ' Columna: ' + this._$.first_column); }
;

SENTENCIAS_CICLO
    : SENTENCIAS
    | r_break punto_y_coma
    | r_continue punto_y_coma
;

/******************************************************************************************************************/

WHILE
    : r_while parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE
;

/******************************************************************************************************************/

DO_WHILE
    : r_do BLOCK_CYCLE r_while parentesis_izq EXPRESION parentesis_der punto_y_coma
;

/******************************************************************************************************************/

IF
    : r_if parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE							{ $$ = `si ( ${$3} ) \n${$5}`; }
    | r_if parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE r_else BLOCK_CYCLE	{ $$ = `si ( ${$3} ) \n${$5}sino \n${$7}`; }
    | r_if parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE r_else IF
;

/******************************************************************************************************************/

RETURN
    : r_return EXPRESION punto_y_coma
    | r_return punto_y_coma
;

/******************************************************************************************************************/

PRINT
    : r_System punto r_out punto r_println parentesis_izq EXPRESION parentesis_der punto_y_coma
    | r_System punto r_out punto r_print parentesis_izq EXPRESION parentesis_der punto_y_coma
;

/******************************************************************************************************************/

EXPRESION
	: EXPRESION s_mas EXPRESION                     {$$ = new Aritmetica($1, Type_Operation.SUMA, $3); }
    | EXPRESION s_menos EXPRESION                   {$$ = new Aritmetica($1, Type_Operation.RESTA, $3); }
    | EXPRESION s_por EXPRESION                     {$$ = new Aritmetica($1, Type_Operation.MULTIPLICACION, $3); }
    | EXPRESION s_division EXPRESION                {$$ = new Aritmetica($1, Type_Operation.DIVISION, $3); }
    | s_menos EXPRESION %prec UMENOS	            {$$ = new Aritmetica($2, Type_Operation.MENOS_UNARIO, null); }

    | EXPRESION s_AND EXPRESION                     {$$ = new Logica($1, Type_Operation.AND, $3); }
    | EXPRESION s_OR EXPRESION                      {$$ = new Logica($1, Type_Operation.OR, $3); }
    | EXPRESION s_XOR EXPRESION                     {$$ = new Logica($1, Type_Operation.XOR, $3); }
    | s_NOT EXPRESION %prec UNOT                    {$$ = new Logica($2, Type_Operation.NOT_UNARIO, null); }

    | EXPRESION s_doble_igual EXPRESION             {$$ = new Relacional($1, Type_Operation.DOBLE_IGUAL, $3); }
    | EXPRESION s_diferente_de EXPRESION            {$$ = new Relacional($1, Type_Operation.DIFERENTE_DE, $3); }
    | EXPRESION s_menor_que EXPRESION               {$$ = new Relacional($1, Type_Operation.MENOR_QUE, $3); }
    | EXPRESION s_mayor_que EXPRESION               {$$ = new Relacional($1, Type_Operation.MAYOR_QUE, $3); }
    | EXPRESION s_menor_igual_que EXPRESION         {$$ = new Relacional($1, Type_Operation.MENOR_IGUAL_QUE, $3); }
    | EXPRESION s_mayor_igual_que EXPRESION         {$$ = new Relacional($1, Type_Operation.MAYOR_IGUAL_QUE, $3); }

    | EXPRESION s_pos_incremento                    {$$ = new Aritmetica($1, Type_Operation.POS_INCREMENTO, null); }
    | EXPRESION s_pos_decremento                    {$$ = new Aritmetica($1, Type_Operation.POS_DECREMENTO, null); }
    | parentesis_izq EXPRESION parentesis_der       {$$ = new Aritmetica($2, Type_Operation.PARENTESIS, null); }

    | identificador BLOCK_PARAMETROS_PRIMITIVOS     {$$ = new Identifier($1, $2, Type_Operation.LLAMADA_METODO,false, this._$.first_column); }
    | PRIMITIVOS                                    {$$ = $1}
;

PRIMITIVOS
    : numero_entero                                 {$$ = new Primitivo($1); }
    | numero_decimal                                {$$ = new Primitivo($1); }
    | cadena_char                                   {$$ = new Primitivo($1); }
    | cadena_string                                 {$$ = new Primitivo($1); }
    | r_true                                        {$$ = new Primitivo($1); }
    | r_false                                       {$$ = new Primitivo($1); }
    | identificador                                 {$$ = new Identifier($1, null, Type_Operation.IDENTIFICADOR, false, this._$.first_column); }
;
/******************************************************************************************************************/
/******************************************************************************************************************/
