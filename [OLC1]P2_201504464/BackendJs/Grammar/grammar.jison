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
    const { Return_Continue_Break } = require('../dist/AST/Sentences/Return_Continue_Break');
    const { For } = require('../dist/AST/Sentences/For');
    const { While } = require('../dist/AST/Sentences/While');
    const { Do_While } = require('../dist/AST/Sentences/Do_While');
    const { If } = require('../dist/AST/Sentences/If');
    const { Print } = require('../dist/AST/Sentences/Print');
    const { Tipo } = require('../dist/TOKENS/Token');
    const { TipoError } = require('../dist/TOKENS/Token_Error');
    const { Listas } = require('../dist/TOKENS/Listas');
%}

/* Definición Léxica */
%lex

%options case-sensitive

%%
\s+											// se ignoran espacios en blanco
"//".*										/* comentario simple línea*/ {Listas.addToken(Tipo.COMENTARIO_LINEA, yytext, yylloc.first_line, yylloc.first_column);}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			{Listas.addToken(Tipo.COMENTARIO_BLOQUE, yytext, yylloc.first_line, yylloc.first_column);} /* comentario multiple líneas*/

"public"			{Listas.addToken(Tipo.RESERVADA_PUBLIC, yytext, yylloc.first_line, yylloc.first_column); return 'r_public';}
"class"			    {Listas.addToken(Tipo.RESERVADA_CLASS, yytext, yylloc.first_line, yylloc.first_column); return 'r_class';}
"interface"		    {Listas.addToken(Tipo.RESERVADA_INTERFACE, yytext, yylloc.first_line, yylloc.first_column); return 'r_interface';}
"void"			    {Listas.addToken(Tipo.RESERVADA_VOID, yytext, yylloc.first_line, yylloc.first_column); return 'r_void';}
"for"				{Listas.addToken(Tipo.RESERVADA_FOR, yytext, yylloc.first_line, yylloc.first_column); return 'r_for';}
"while"				{Listas.addToken(Tipo.RESERVADA_WHILE, yytext, yylloc.first_line, yylloc.first_column); return 'r_while';}
"do"				{Listas.addToken(Tipo.RESERVADA_DO, yytext, yylloc.first_line, yylloc.first_column); return 'r_do';}
"if"				{Listas.addToken(Tipo.RESERVADA_IF, yytext, yylloc.first_line, yylloc.first_column); return 'r_if';}
"else"				{Listas.addToken(Tipo.RESERVADA_ELSE, yytext, yylloc.first_line, yylloc.first_column); return 'r_else';}
"break"				{Listas.addToken(Tipo.RESERVADA_BREAK, yytext, yylloc.first_line, yylloc.first_column); return 'r_break';}
"continue"			{Listas.addToken(Tipo.RESERVADA_CONTINUE, yytext, yylloc.first_line, yylloc.first_column); return 'r_continue';}
"return"            {Listas.addToken(Tipo.RESERVADA_RETURN, yytext, yylloc.first_line, yylloc.first_column); return 'r_return';}
"int"			    {Listas.addToken(Tipo.RESERVADA_INT, yytext, yylloc.first_line, yylloc.first_column); return 'r_int';}
"double"			{Listas.addToken(Tipo.RESERVADA_DOUBLE, yytext, yylloc.first_line, yylloc.first_column); return 'r_double';}
"String"			{Listas.addToken(Tipo.RESERVADA_STRING, yytext, yylloc.first_line, yylloc.first_column); return 'r_String';}
"char"				{Listas.addToken(Tipo.RESERVADA_CHAR, yytext, yylloc.first_line, yylloc.first_column); return 'r_char';}
"boolean"			{Listas.addToken(Tipo.RESERVADA_BOOLEAN, yytext, yylloc.first_line, yylloc.first_column); return 'r_boolean';}
"true"				{Listas.addToken(Tipo.RESERVADA_TRUE, yytext, yylloc.first_line, yylloc.first_column); return 'r_true';}
"false"				{Listas.addToken(Tipo.RESERVADA_FALSE, yytext, yylloc.first_line, yylloc.first_column); return 'r_false';}
"static"            {Listas.addToken(Tipo.RESERVADA_STATIC, yytext, yylloc.first_line, yylloc.first_column); return 'r_static';}
"main"				{Listas.addToken(Tipo.RESERVADA_MAIN, yytext, yylloc.first_line, yylloc.first_column); return 'r_main';}
"args"				{Listas.addToken(Tipo.RESERVADA_ARGS, yytext, yylloc.first_line, yylloc.first_column); return 'r_args';}
"System"			{Listas.addToken(Tipo.RESERVADA_SYSTEM, yytext, yylloc.first_line, yylloc.first_column); return 'r_System';}
"out"				{Listas.addToken(Tipo.RESERVADA_OUT, yytext, yylloc.first_line, yylloc.first_column); return 'r_out';}
"println"			{Listas.addToken(Tipo.RESERVADA_PRINTLN, yytext, yylloc.first_line, yylloc.first_column); return 'r_println';}
"print"             {Listas.addToken(Tipo.RESERVADA_PRINT, yytext, yylloc.first_line, yylloc.first_column); return 'r_print';}

"{"					{Listas.addToken(Tipo.LLAVE_IZQ, yytext, yylloc.first_line, yylloc.first_column); return 'llave_izq';}
"}"					{Listas.addToken(Tipo.LLAVE_DER, yytext, yylloc.first_line, yylloc.first_column); return 'llave_der';}
","					{Listas.addToken(Tipo.COMA, yytext, yylloc.first_line, yylloc.first_column); return 'coma';}
"."					{Listas.addToken(Tipo.PUNTO, yytext, yylloc.first_line, yylloc.first_column); return 'punto';}
";"					{Listas.addToken(Tipo.PUNTO_Y_COMA, yytext, yylloc.first_line, yylloc.first_column); return 'punto_y_coma';}
"["					{Listas.addToken(Tipo.CORCHETE_IZQ, yytext, yylloc.first_line, yylloc.first_column); return 'corchete_izq';}
"]"					{Listas.addToken(Tipo.CORCHETE_DER, yytext, yylloc.first_line, yylloc.first_column); return 'corchete_der';}
"("					{Listas.addToken(Tipo.PARENTESIS_IZQ, yytext, yylloc.first_line, yylloc.first_column); return 'parentesis_izq';}
")"					{Listas.addToken(Tipo.PARENTESIS_DER, yytext, yylloc.first_line, yylloc.first_column); return 'parentesis_der';}

"++"				{Listas.addToken(Tipo.SIGNO_POS_INCREMENTO, yytext, yylloc.first_line, yylloc.first_column); return 's_pos_incremento';}
"--"				{Listas.addToken(Tipo.SIGNO_POS_DECREMENTO, yytext, yylloc.first_line, yylloc.first_column); return 's_pos_decremento';}
"+"					{Listas.addToken(Tipo.SIGNO_MAS, yytext, yylloc.first_line, yylloc.first_column); return 's_mas';}
"-"					{Listas.addToken(Tipo.SIGNO_MENOS, yytext, yylloc.first_line, yylloc.first_column); return 's_menos';}
"*"					{Listas.addToken(Tipo.SIGNO_POR, yytext, yylloc.first_line, yylloc.first_column); return 's_por';}
"/"					{Listas.addToken(Tipo.SIGNO_DIVISION, yytext, yylloc.first_line, yylloc.first_column); return 's_division';}

">="				{Listas.addToken(Tipo.SIGNO_MAYOR_IGUAL_QUE, yytext, yylloc.first_line, yylloc.first_column); return 's_mayor_igual_que';}
"<="				{Listas.addToken(Tipo.SIGNO_MENOR_IGUAL_QUE, yytext, yylloc.first_line, yylloc.first_column); return 's_menor_igual_que';}
"<"					{Listas.addToken(Tipo.SIGNO_MENOR_QUE, yytext, yylloc.first_line, yylloc.first_column); return 's_menor_que';}
">"					{Listas.addToken(Tipo.SIGNO_MAYOR_QUE, yytext, yylloc.first_line, yylloc.first_column); return 's_mayor_que';}
"!="				{Listas.addToken(Tipo.SIGNO_DIFERENTE_DE, yytext, yylloc.first_line, yylloc.first_column); return 's_diferente_de';}
"=="				{Listas.addToken(Tipo.SIGNO_DOBLE_IGUAL, yytext, yylloc.first_line, yylloc.first_column); return 's_doble_igual';}
"="					{Listas.addToken(Tipo.SIGNO_IGUAL, yytext, yylloc.first_line, yylloc.first_column); return 's_igual';}
"&&"				{Listas.addToken(Tipo.SIGNO_AND, yytext, yylloc.first_line, yylloc.first_column); return 's_AND';}
"||"				{Listas.addToken(Tipo.SIGNO_OR, yytext, yylloc.first_line, yylloc.first_column); return 's_OR';}
"!"					{Listas.addToken(Tipo.SIGNO_NOT, yytext, yylloc.first_line, yylloc.first_column); return 's_NOT';}
"^"				    {Listas.addToken(Tipo.SIGNO_XOR, yytext, yylloc.first_line, yylloc.first_column); return 's_XOR';}


\"[^\"]*\"	                            {Listas.addToken(Tipo.CADENA_STRING, yytext, yylloc.first_line, yylloc.first_column); return 'cadena_string';} 
"'"[^']"'"				                {Listas.addToken(Tipo.CADENA_CHAR, yytext, yylloc.first_line, yylloc.first_column); return 'cadena_char';}
[0-9]+("."[0-9]+)\b  			        {Listas.addToken(Tipo.NUMERO_DECIMAL, yytext, yylloc.first_line, yylloc.first_column); return 'numero_decimal';}
[0-9]+\b								{Listas.addToken(Tipo.NUMERO_ENTERO, yytext, yylloc.first_line, yylloc.first_column); return 'numero_entero';}
([a-zA-Z])[a-zA-Z0-9_]*	                {Listas.addToken(Tipo.IDENTIFICADOR, yytext, yylloc.first_line, yylloc.first_column); return 'identificador';}

<<EOF>>				return 'EOF';

.					{ Listas.addTokenError(yytext, TipoError.LEXICO, "El caracter no pertenece al lenguaje", yylloc.first_line, yylloc.first_column);}

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
    | error llave_der { Listas.addTokenError(yytext, TipoError.SINTACTICO, "Error en instruccion class/interface, se recupero en->", this._$.first_line, this._$.first_column); $$ = [new Class_Interface("", "", "", [], this._$.first_column)]; } //Se debe retornar algo para que no truene, en este caso una instancia de class
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
    | error { Listas.addTokenError(yytext, TipoError.SINTACTICO, "Error cerca de este caracter", this._$.first_line, this._$.first_column); $$ = [new Declaration("", [], this._$.first_column)]; }
    | error punto_y_coma { Listas.addTokenError(yytext, TipoError.SINTACTICO, "Error en sentencia global, se recupero en->", this._$.first_line, this._$.first_column); $$ = [new Declaration("", [], this._$.first_column)];}
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
    | error { Listas.addTokenError(yytext, TipoError.SINTACTICO, "Error cerca de este caracter", this._$.first_line, this._$.first_column); $$ = [new Method("", "", "", [], [], this._$.first_column)]; }
    | error punto_y_coma { Listas.addTokenError(yytext, TipoError.SINTACTICO, "Error en definir funcion, se recupero en->", this._$.first_line, this._$.first_column); $$ = [new Method("", "", "", [], [], this._$.first_column)]; }
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
    | error { Listas.addTokenError(yytext, TipoError.SINTACTICO, "Error cerca de este caracter", this._$.first_line, this._$.first_column); $$ = [new Declaration("", [], this._$.first_column)]; }
    | error punto_y_coma { Listas.addTokenError(yytext, TipoError.SINTACTICO, "Error en sentencia local, se recupero en->", this._$.first_line, this._$.first_column); $$ = [new Declaration("", [], this._$.first_column)]; }
;

SENTENCIAS
    : DECLARATION punto_y_coma                                  {$$ = $1; }
    | ASIGNATION punto_y_coma                                   {$$ = $1; }
    | OTHERS_ASIGNATIONS punto_y_coma                           {$$ = $1; }
    | identificador BLOCK_PARAMETROS_PRIMITIVOS punto_y_coma    {$$ = new Identifier($1, $2, Type_Operation.LLAMADA_METODO, true, this._$.first_column);}
    | FOR                                                       {$$ = $1; }
    | WHILE                                                     {$$ = $1; }
    | DO_WHILE                                                  {$$ = $1; }
    | IF                                                        {$$ = $1; }
    | RETURN                                                    {$$ = $1; }
    | PRINT                                                     {$$ = $1; }
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
    : r_for parentesis_izq DECLARATION punto_y_coma EXPRESION punto_y_coma EXPRESION parentesis_der BLOCK_CYCLE {$$ = new For($3, $5, $7, $9, this._$.first_column); }
;

BLOCK_CYCLE
    : llave_izq LIST_BLOQUE_CICLO llave_der {$$ = $2; }
    | llave_izq llave_der                   {$$ = []; }
;

LIST_BLOQUE_CICLO
    : LIST_BLOQUE_CICLO SENTENCIAS_CICLO    {$1.push($2); $$ = $1; }
    | SENTENCIAS_CICLO                      {$$ = [$1]; }
    | error { Listas.addTokenError(yytext, TipoError.SINTACTICO, "Error cerca de este caracter", this._$.first_line, this._$.first_column); $$ = [new Return_Continue_Break("", [], false, this._$.first_column)]; }
    | error punto_y_coma { Listas.addTokenError(yytext, TipoError.SINTACTICO, "Error en sentencia local ciclo, se recupero en->", this._$.first_line, this._$.first_column); $$ = [new Return_Continue_Break("", [], false, this._$.first_column)];}   
;

SENTENCIAS_CICLO
    : SENTENCIAS                {$$ = $1; }
    | r_break punto_y_coma      {$$ = new Return_Continue_Break($1, null, false, this._$.first_column); }
    | r_continue punto_y_coma   {$$ = new Return_Continue_Break($1, null, false, this._$.first_column); }
;

/******************************************************************************************************************/

WHILE
    : r_while parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE   {$$ = new While($3, $5, this._$.first_column); }
;

/******************************************************************************************************************/

DO_WHILE
    : r_do BLOCK_CYCLE r_while parentesis_izq EXPRESION parentesis_der punto_y_coma {$$ = new Do_While($2, $5, this._$.first_column); }
;

/******************************************************************************************************************/

IF
    : r_if parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE							{$$ = new If($3, $5, false, null, false, null, true, this._$.first_column); }
    | r_if parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE r_else BLOCK_CYCLE       {$$ = new If($3, $5, true, $7, false, null, true, this._$.first_column); }
    | r_if parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE r_else IF_N              {$$ = new If($3, $5, false, null, true, $7, true, this._$.first_column); }
;

IF_N
    : r_if parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE							{$$ = new If($3, $5, false, null, false, null, false, this._$.first_column); }
    | r_if parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE r_else BLOCK_CYCLE       {$$ = new If($3, $5, true, $7, false, null, false, this._$.first_column); }
    | r_if parentesis_izq EXPRESION parentesis_der BLOCK_CYCLE r_else IF_N              {$$ = new If($3, $5, false, null, true, $7, false, this._$.first_column); }
;

/******************************************************************************************************************/

RETURN
    : r_return EXPRESION punto_y_coma   {$$ = new Return_Continue_Break($1, $2, true, this._$.first_column); }
    | r_return punto_y_coma             {$$ = new Return_Continue_Break($1, null, false, this._$.first_column); }
;

/******************************************************************************************************************/

PRINT
    : r_System punto r_out punto r_println parentesis_izq EXPRESION parentesis_der punto_y_coma {$$ = new Print($5, $7, this._$.first_column); }
    | r_System punto r_out punto r_print parentesis_izq EXPRESION parentesis_der punto_y_coma   {$$ = new Print($5, $7, this._$.first_column); }
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
