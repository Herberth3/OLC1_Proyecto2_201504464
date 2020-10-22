/* Definición Léxica */
%lex

%options case-insensitive

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

"<"					return 's_menor_que';
">"					return 's_mayor_que';
"!="				return 's_diferente_de';
">="				return 's_mayor_igual_que';
"<="				return 's_menor_igual_que';
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
                        console.log('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        
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
		// cuando se haya reconocido la entrada completa retornamos la entrada traducida
		return $1;
	}
;

LIST_INSTRUCTIONS
    : LIST_INSTRUCTIONS INSTRUCTIONS
    | INSTRUCTIONS
;

INSTRUCTIONS
    : r_public r_class identificador BLOCK_DECLARATION_GLOBAL
    | r_public r_interface identificador BLOCK_DEFINITION_FUNCTIONS
;

BLOCK_DECLARATION_GLOBAL
    : llave_izq LIST_DECLARATION_GLOBAL llave_der
    | llave_izq llave_der
;

BLOCK_DEFINITION_FUNCTIONS
    : llave_izq LIST_DEFINITION_FUNCTIONS llave_der
    | llave_izq llave_der
;

/******************************************************************************************************************/

LIST_DECLARATION_GLOBAL
    : LIST_DECLARATION_GLOBAL DECLARATION_GLOBAL
    | DECLARATION_GLOBAL
;

DECLARATION_GLOBAL
    : DECLARATION punto_y_coma
    | ASIGNATION punto_y_coma
    | METHOD
;

LIST_DEFINITION_FUNCTIONS
    : LIST_DEFINITION_FUNCTIONS DEFINITION_FUNCTIONS
    | DEFINITION_FUNCTIONS
;

DEFINITION_FUNCTIONS
    : r_public TYPE_METHOD identificador BLOCK_PARAMETROS punto_y_coma
;

/******************************************************************************************************************/

DECLARATION
    : TYPE_DATA LIST_DECLA_ASIGN
;

TYPE_DATA
    : r_int
    | r_boolean
    | r_double
    | r_String
    | r_char
;

LIST_DECLA_ASIGN
    : identificador
    | identificador s_igual EXPRESION
    | identificador coma LIST_DECLA_ASIGN
    | identificador s_igual EXPRESION coma LIST_DECLA_ASIGN
;

/******************************************************************************************************************/

ASIGNATION
    : identificador s_igual EXPRESION
;

/******************************************************************************************************************/

METHOD
    : r_public r_static r_void r_main parentesis_izq r_String corchete_izq corchete_der r_args parentesis_der BLOCK_SENTENCIAS
    | r_public TYPE_METHOD identificador BLOCK_PARAMETROS BLOCK_SENTENCIAS
;

TYPE_METHOD
    : r_void
    | TYPE_DATA
;

BLOCK_PARAMETROS
    : parentesis_izq LIST_PARAMETROS parentesis_der
    | parentesis_izq parentesis_der
;

LIST_PARAMETROS
    : TYPE_DATA identificador
    | TYPE_DATA identificador coma LIST_PARAMETROS
;

BLOCK_SENTENCIAS
    : llave_izq LIST_SENTENCIAS llave_der
    | llave_izq llave_der
;

/******************************************************************************************************************/

LIST_SENTENCIAS
    : LIST_SENTENCIAS SENTENCIAS
    | SENTENCIAS
;

SENTENCIAS
    : DECLARATION punto_y_coma
    | ASIGNATION punto_y_coma
    | FOR
    | WHILE
    | DO_WHILE
    | IF
    | RETURN
    | PRINT
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
    : r_System punto r_out r_println parentesis_izq EXPRESION parentesis_der punto_y_coma
    | r_System punto r_out r_print parentesis_izq EXPRESION parentesis_der punto_y_coma
;

/******************************************************************************************************************/

EXPRESION
	: EXPRESION s_mas EXPRESION               { $$ = `${$1} + ${$3}`; }
    | EXPRESION s_menos EXPRESION             { $$ = `${$1} - ${$3}`; }
    | EXPRESION s_por EXPRESION               { $$ = `${$1} * ${$3}`; }
    | EXPRESION s_division EXPRESION               { $$ = `${$1} / ${$3}`; }
    | s_menos EXPRESION %prec UMENOS	        { $$ = `- ${$2}`; }
    | EXPRESION s_AND EXPRESION               { $$ = `${$1} && ${$3}`; }
    | EXPRESION s_OR EXPRESION                { $$ = `${$1} || ${$3}`; }
    | EXPRESION s_XOR EXPRESION                { $$ = `${$1} || ${$3}`; }
    | EXPRESION s_doble_igual EXPRESION        { $$ = `${$1} == ${$3}`; }
    | EXPRESION s_diferente_de EXPRESION         { $$ = `${$1} != ${$3}`; }
    | EXPRESION s_menor_que EXPRESION          { $$ = `${$1} < ${$3}`; }
    | EXPRESION s_mayor_que EXPRESION          { $$ = `${$1} > ${$3}`; }
    | EXPRESION s_menor_igual_que EXPRESION       { $$ = `${$1} <= ${$3}`; }
    | EXPRESION s_mayor_igual_que EXPRESION       { $$ = `${$1} >= ${$3}`; }
    | EXPRESION s_pos_incremento
    | EXPRESION s_pos_decremento

    | s_NOT EXPRESION %prec UNOT              { $$ = `! ${$2}`; }
    | parentesis_izq EXPRESION parentesis_der                   { $$ = `( ${$2} )`; }
    | numero_entero                                { $$ = `${$1}`; }
    | numero_decimal                               { $$ = `${$1}`; }
    | cadena_char                              { $$ = `${$1}`; }
    | cadena_string                                { $$ = `${$1}`; }
    | r_true                                 { $$ = `verdadero` }
    | r_false                                { $$ = `falso` }
    | identificador CALL_METHOD                         { $$ = $1 }
;

CALL_METHOD
    : BLOCK_PARAMETROS
;

/******************************************************************************************************************/
/******************************************************************************************************************/
