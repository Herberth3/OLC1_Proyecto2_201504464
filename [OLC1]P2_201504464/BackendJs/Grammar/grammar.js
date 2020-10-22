/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var grammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,4],$V1=[5,7],$V2=[1,23],$V3=[1,22],$V4=[1,24],$V5=[1,25],$V6=[1,26],$V7=[1,27],$V8=[1,28],$V9=[1,32],$Va=[7,9,15,27,28,29,30,31],$Vb=[1,38],$Vc=[1,42],$Vd=[7,15],$Ve=[1,59],$Vf=[1,52],$Vg=[1,50],$Vh=[1,51],$Vi=[1,53],$Vj=[1,54],$Vk=[1,55],$Vl=[1,56],$Vm=[1,57],$Vn=[1,58],$Vo=[1,65],$Vp=[1,66],$Vq=[1,67],$Vr=[1,68],$Vs=[1,69],$Vt=[1,70],$Vu=[1,71],$Vv=[1,72],$Vw=[1,73],$Vx=[1,74],$Vy=[1,75],$Vz=[1,76],$VA=[1,77],$VB=[1,78],$VC=[1,79],$VD=[19,34,42,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83],$VE=[1,85],$VF=[1,109],$VG=[19,34,42,69,70,73,74,75,76,77,78,79,80,81,82,83],$VH=[19,34,42,73,74,75,76,77,82,83],$VI=[19,34,42,73,74,75,76,77,78,79,80,81,82,83],$VJ=[13,19,34,42,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83],$VK=[1,126],$VL=[1,127],$VM=[1,128],$VN=[1,129],$VO=[1,130],$VP=[1,131],$VQ=[9,15,27,28,29,30,31,53,59,60,61,63,64],$VR=[9,15,27,28,29,30,31,53,57,58,59,60,61,63,64],$VS=[1,141],$VT=[1,155],$VU=[1,156],$VV=[9,15,27,28,29,30,31,53,57,58,59,60,61,62,63,64];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"LIST_INSTRUCTIONS":4,"EOF":5,"INSTRUCTIONS":6,"r_public":7,"r_class":8,"identificador":9,"BLOCK_DECLARATION_GLOBAL":10,"r_interface":11,"BLOCK_DEFINITION_FUNCTIONS":12,"llave_izq":13,"LIST_DECLARATION_GLOBAL":14,"llave_der":15,"LIST_DEFINITION_FUNCTIONS":16,"DECLARATION_GLOBAL":17,"DECLARATION":18,"punto_y_coma":19,"ASIGNATION":20,"METHOD":21,"DEFINITION_FUNCTIONS":22,"TYPE_METHOD":23,"BLOCK_PARAMETROS":24,"TYPE_DATA":25,"LIST_DECLA_ASIGN":26,"r_int":27,"r_boolean":28,"r_double":29,"r_String":30,"r_char":31,"s_igual":32,"EXPRESION":33,"coma":34,"r_static":35,"r_void":36,"r_main":37,"parentesis_izq":38,"corchete_izq":39,"corchete_der":40,"r_args":41,"parentesis_der":42,"BLOCK_SENTENCIAS":43,"LIST_PARAMETROS":44,"LIST_SENTENCIAS":45,"SENTENCIAS":46,"FOR":47,"WHILE":48,"DO_WHILE":49,"IF":50,"RETURN":51,"PRINT":52,"r_for":53,"BLOCK_CYCLE":54,"LIST_BLOQUE_CICLO":55,"SENTENCIAS_CICLO":56,"r_break":57,"r_continue":58,"r_while":59,"r_do":60,"r_if":61,"r_else":62,"r_return":63,"r_System":64,"punto":65,"r_out":66,"r_println":67,"r_print":68,"s_mas":69,"s_menos":70,"s_por":71,"s_division":72,"s_AND":73,"s_OR":74,"s_XOR":75,"s_doble_igual":76,"s_diferente_de":77,"s_menor_que":78,"s_mayor_que":79,"s_menor_igual_que":80,"s_mayor_igual_que":81,"s_pos_incremento":82,"s_pos_decremento":83,"s_NOT":84,"numero_entero":85,"numero_decimal":86,"cadena_char":87,"cadena_string":88,"r_true":89,"r_false":90,"CALL_METHOD":91,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"r_public",8:"r_class",9:"identificador",11:"r_interface",13:"llave_izq",15:"llave_der",19:"punto_y_coma",27:"r_int",28:"r_boolean",29:"r_double",30:"r_String",31:"r_char",32:"s_igual",34:"coma",35:"r_static",36:"r_void",37:"r_main",38:"parentesis_izq",39:"corchete_izq",40:"corchete_der",41:"r_args",42:"parentesis_der",53:"r_for",57:"r_break",58:"r_continue",59:"r_while",60:"r_do",61:"r_if",62:"r_else",63:"r_return",64:"r_System",65:"punto",66:"r_out",67:"r_println",68:"r_print",69:"s_mas",70:"s_menos",71:"s_por",72:"s_division",73:"s_AND",74:"s_OR",75:"s_XOR",76:"s_doble_igual",77:"s_diferente_de",78:"s_menor_que",79:"s_mayor_que",80:"s_menor_igual_que",81:"s_mayor_igual_que",82:"s_pos_incremento",83:"s_pos_decremento",84:"s_NOT",85:"numero_entero",86:"numero_decimal",87:"cadena_char",88:"cadena_string",89:"r_true",90:"r_false"},
productions_: [0,[3,2],[4,2],[4,1],[6,4],[6,4],[10,3],[10,2],[12,3],[12,2],[14,2],[14,1],[17,2],[17,2],[17,1],[16,2],[16,1],[22,5],[18,2],[25,1],[25,1],[25,1],[25,1],[25,1],[26,1],[26,3],[26,3],[26,5],[20,3],[21,11],[21,5],[23,1],[23,1],[24,3],[24,2],[44,2],[44,4],[43,3],[43,2],[45,2],[45,1],[46,2],[46,2],[46,1],[46,1],[46,1],[46,1],[46,1],[46,1],[47,9],[54,3],[54,2],[55,2],[55,1],[56,1],[56,2],[56,2],[48,5],[49,7],[50,5],[50,7],[50,7],[51,3],[51,2],[52,8],[52,8],[33,3],[33,3],[33,3],[33,3],[33,2],[33,3],[33,3],[33,3],[33,3],[33,3],[33,3],[33,3],[33,3],[33,3],[33,2],[33,2],[33,2],[33,3],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[33,2],[91,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

		// cuando se haya reconocido la entrada completa retornamos la entrada traducida
		return $$[$0-1];
	
break;
case 59:
 this.$ = `si ( ${$$[$0-2]} ) \n${$$[$0]}`; 
break;
case 60:
 this.$ = `si ( ${$$[$0-4]} ) \n${$$[$0-2]}sino \n${$$[$0]}`; 
break;
case 66:
 this.$ = `${$$[$0-2]} + ${$$[$0]}`; 
break;
case 67:
 this.$ = `${$$[$0-2]} - ${$$[$0]}`; 
break;
case 68:
 this.$ = `${$$[$0-2]} * ${$$[$0]}`; 
break;
case 69:
 this.$ = `${$$[$0-2]} / ${$$[$0]}`; 
break;
case 70:
 this.$ = `- ${$$[$0]}`; 
break;
case 71:
 this.$ = `${$$[$0-2]} && ${$$[$0]}`; 
break;
case 72: case 73:
 this.$ = `${$$[$0-2]} || ${$$[$0]}`; 
break;
case 74:
 this.$ = `${$$[$0-2]} == ${$$[$0]}`; 
break;
case 75:
 this.$ = `${$$[$0-2]} != ${$$[$0]}`; 
break;
case 76:
 this.$ = `${$$[$0-2]} < ${$$[$0]}`; 
break;
case 77:
 this.$ = `${$$[$0-2]} > ${$$[$0]}`; 
break;
case 78:
 this.$ = `${$$[$0-2]} <= ${$$[$0]}`; 
break;
case 79:
 this.$ = `${$$[$0-2]} >= ${$$[$0]}`; 
break;
case 82:
 this.$ = `! ${$$[$0]}`; 
break;
case 83:
 this.$ = `( ${$$[$0-1]} )`; 
break;
case 84: case 85: case 86: case 87:
 this.$ = `${$$[$0]}`; 
break;
case 88:
 this.$ = `verdadero` 
break;
case 89:
 this.$ = `falso` 
break;
case 90:
 this.$ = $$[$0-1] 
break;
}
},
table: [{3:1,4:2,6:3,7:$V0},{1:[3]},{5:[1,5],6:6,7:$V0},o($V1,[2,3]),{8:[1,7],11:[1,8]},{1:[2,1]},o($V1,[2,2]),{9:[1,9]},{9:[1,10]},{10:11,13:[1,12]},{12:13,13:[1,14]},o($V1,[2,4]),{7:$V2,9:$V3,14:15,15:[1,16],17:17,18:18,20:19,21:20,25:21,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8},o($V1,[2,5]),{7:$V9,15:[1,30],16:29,22:31},{7:$V2,9:$V3,15:[1,33],17:34,18:18,20:19,21:20,25:21,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8},o($V1,[2,7]),o($Va,[2,11]),{19:[1,35]},{19:[1,36]},o($Va,[2,14]),{9:$Vb,26:37},{32:[1,39]},{23:41,25:43,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8,35:[1,40],36:$Vc},{9:[2,19]},{9:[2,20]},{9:[2,21]},{9:[2,22]},{9:[2,23]},{7:$V9,15:[1,44],22:45},o($V1,[2,9]),o($Vd,[2,16]),{23:46,25:43,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8,36:$Vc},o($V1,[2,6]),o($Va,[2,10]),o($Va,[2,12]),o($Va,[2,13]),{19:[2,18]},{19:[2,24],32:[1,47],34:[1,48]},{9:$Ve,33:49,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{36:[1,60]},{9:[1,61]},{9:[2,31]},{9:[2,32]},o($V1,[2,8]),o($Vd,[2,15]),{9:[1,62]},{9:$Ve,33:63,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Vb,26:64},{19:[2,28],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},{9:$Ve,33:80,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:81,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:82,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},o($VD,[2,84]),o($VD,[2,85]),o($VD,[2,86]),o($VD,[2,87]),o($VD,[2,88]),o($VD,[2,89]),{24:84,38:$VE,91:83},{37:[1,86]},{24:87,38:$VE},{24:88,38:$VE},{19:[2,25],34:[1,89],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},{19:[2,26]},{9:$Ve,33:90,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:91,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:92,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:93,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:94,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:95,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:96,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:97,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:98,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:99,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:100,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:101,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:102,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},o($VD,[2,80]),o($VD,[2,81]),o($VD,[2,70]),o($VD,[2,82]),{42:[1,103],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},o($VD,[2,90]),o($VD,[2,91]),{25:106,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8,42:[1,105],44:104},{38:[1,107]},{13:$VF,43:108},{19:[1,110]},{9:$Vb,26:111},o($VG,[2,66],{71:$Vq,72:$Vr}),o($VG,[2,67],{71:$Vq,72:$Vr}),o($VD,[2,68]),o($VD,[2,69]),o([19,34,42,73,74,82,83],[2,71],{69:$Vo,70:$Vp,71:$Vq,72:$Vr,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA}),o([19,34,42,74,82,83],[2,72],{69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA}),o([19,34,42,73,74,75,82,83],[2,73],{69:$Vo,70:$Vp,71:$Vq,72:$Vr,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA}),o($VH,[2,74],{69:$Vo,70:$Vp,71:$Vq,72:$Vr,78:$Vx,79:$Vy,80:$Vz,81:$VA}),o($VH,[2,75],{69:$Vo,70:$Vp,71:$Vq,72:$Vr,78:$Vx,79:$Vy,80:$Vz,81:$VA}),o($VI,[2,76],{69:$Vo,70:$Vp,71:$Vq,72:$Vr}),o($VI,[2,77],{69:$Vo,70:$Vp,71:$Vq,72:$Vr}),o($VI,[2,78],{69:$Vo,70:$Vp,71:$Vq,72:$Vr}),o($VI,[2,79],{69:$Vo,70:$Vp,71:$Vq,72:$Vr}),o($VD,[2,83]),{42:[1,112]},o($VJ,[2,34]),{9:[1,113]},{30:[1,114]},o($Va,[2,30]),{9:$V3,15:[1,116],18:118,20:119,25:21,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8,45:115,46:117,47:120,48:121,49:122,50:123,51:124,52:125,53:$VK,59:$VL,60:$VM,61:$VN,63:$VO,64:$VP},o($Vd,[2,17]),{19:[2,27]},o($VJ,[2,33]),{34:[1,132],42:[2,35]},{39:[1,133]},{9:$V3,15:[1,134],18:118,20:119,25:21,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8,46:135,47:120,48:121,49:122,50:123,51:124,52:125,53:$VK,59:$VL,60:$VM,61:$VN,63:$VO,64:$VP},o($Va,[2,38]),o($VQ,[2,40]),{19:[1,136]},{19:[1,137]},o($VR,[2,43]),o($VR,[2,44]),o($VR,[2,45]),o($VR,[2,46]),o($VR,[2,47]),o($VR,[2,48]),{38:[1,138]},{38:[1,139]},{13:$VS,54:140},{38:[1,142]},{9:$Ve,19:[1,144],33:143,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{65:[1,145]},{25:106,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8,44:146},{40:[1,147]},o($Va,[2,37]),o($VQ,[2,39]),o($VR,[2,41]),o($VR,[2,42]),{18:148,25:21,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8},{9:$Ve,33:149,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{59:[1,150]},{9:$V3,15:[1,152],18:118,20:119,25:21,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8,46:154,47:120,48:121,49:122,50:123,51:124,52:125,53:$VK,55:151,56:153,57:$VT,58:$VU,59:$VL,60:$VM,61:$VN,63:$VO,64:$VP},{9:$Ve,33:157,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{19:[1,158],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},o($VR,[2,63]),{66:[1,159]},{42:[2,36]},{41:[1,160]},{19:[1,161]},{42:[1,162],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},{38:[1,163]},{9:$V3,15:[1,164],18:118,20:119,25:21,27:$V4,28:$V5,29:$V6,30:$V7,31:$V8,46:154,47:120,48:121,49:122,50:123,51:124,52:125,53:$VK,56:165,57:$VT,58:$VU,59:$VL,60:$VM,61:$VN,63:$VO,64:$VP},o($VV,[2,51]),o($VR,[2,53]),o($VR,[2,54]),{19:[1,166]},{19:[1,167]},{42:[1,168],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},o($VR,[2,62]),{67:[1,169],68:[1,170]},{42:[1,171]},{9:$Ve,33:172,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{13:$VS,54:173},{9:$Ve,33:174,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},o($VV,[2,50]),o($VR,[2,52]),o($VR,[2,55]),o($VR,[2,56]),{13:$VS,54:175},{38:[1,176]},{38:[1,177]},{13:$VF,43:178},{19:[1,179],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},o($VR,[2,57]),{42:[1,180],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},o($VR,[2,59],{62:[1,181]}),{9:$Ve,33:182,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{9:$Ve,33:183,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},o($Va,[2,29]),{9:$Ve,33:184,38:$Vf,70:$Vg,84:$Vh,85:$Vi,86:$Vj,87:$Vk,88:$Vl,89:$Vm,90:$Vn},{19:[1,185]},{13:$VS,50:187,54:186,61:$VN},{42:[1,188],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},{42:[1,189],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},{42:[1,190],69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,76:$Vv,77:$Vw,78:$Vx,79:$Vy,80:$Vz,81:$VA,82:$VB,83:$VC},o($VR,[2,58]),o($VR,[2,60]),o($VR,[2,61]),{19:[1,191]},{19:[1,192]},{13:$VS,54:193},o($VR,[2,64]),o($VR,[2,65]),o($VR,[2,49])],
defaultActions: {5:[2,1],24:[2,19],25:[2,20],26:[2,21],27:[2,22],28:[2,23],37:[2,18],42:[2,31],43:[2,32],64:[2,26],111:[2,27],146:[2,36]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:// se ignoran espacios en blanco
break;
case 1:/* comentario simple línea*/
break;
case 2:/* comentario multiple líneas*/
break;
case 3:return 7;
break;
case 4:return 8;
break;
case 5:return 11;
break;
case 6:return 36;
break;
case 7:return 53;
break;
case 8:return 59;
break;
case 9:return 60;
break;
case 10:return 61;
break;
case 11:return 62;
break;
case 12:return 57;
break;
case 13:return 58;
break;
case 14:return 63;
break;
case 15:return 27;
break;
case 16:return 29;
break;
case 17:return 30;
break;
case 18:return 31;
break;
case 19:return 28;
break;
case 20:return 89;
break;
case 21:return 90;
break;
case 22:return 35;
break;
case 23:return 37;
break;
case 24:return 41;
break;
case 25:return 64;
break;
case 26:return 66;
break;
case 27:return 67;
break;
case 28:return 68;
break;
case 29:return 13;
break;
case 30:return 15;
break;
case 31:return 34;
break;
case 32:return 65;
break;
case 33:return 19;
break;
case 34:return 39;
break;
case 35:return 40;
break;
case 36:return 38;
break;
case 37:return 42;
break;
case 38:return 82;
break;
case 39:return 83;
break;
case 40:return 69;
break;
case 41:return 70;
break;
case 42:return 71;
break;
case 43:return 72;
break;
case 44:return 78;
break;
case 45:return 79;
break;
case 46:return 77;
break;
case 47:return 81;
break;
case 48:return 80;
break;
case 49:return 76;
break;
case 50:return 32;
break;
case 51:return 73;
break;
case 52:return 74;
break;
case 53:return 84;
break;
case 54:return 75;
break;
case 55:return 88; 
break;
case 56:return 87;
break;
case 57:return 86;
break;
case 58:return 85;
break;
case 59:return 9;
break;
case 60:return 5;
break;
case 61: 
                        console.log('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                        
                    
break;
}
},
rules: [/^(?:\s+)/i,/^(?:\/\/.*)/i,/^(?:[\/][*][^*]*[*]+([^\/*][^*]*[*]+)*[\/])/i,/^(?:public\b)/i,/^(?:class\b)/i,/^(?:interface\b)/i,/^(?:void\b)/i,/^(?:for\b)/i,/^(?:while\b)/i,/^(?:do\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:break\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:String\b)/i,/^(?:char\b)/i,/^(?:boolean\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:static\b)/i,/^(?:main\b)/i,/^(?:args\b)/i,/^(?:System\b)/i,/^(?:out\b)/i,/^(?:println\b)/i,/^(?:print\b)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:,)/i,/^(?:\.)/i,/^(?:;)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\()/i,/^(?:\))/i,/^(?:\+\+)/i,/^(?:--)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:<)/i,/^(?:>)/i,/^(?:!=)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:==)/i,/^(?:=)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:!)/i,/^(?:\^)/i,/^(?:"[^\"]*")/i,/^(?:'[^']')/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+\b)/i,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammar;
exports.Parser = grammar.Parser;
exports.parse = function () { return grammar.parse.apply(grammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}