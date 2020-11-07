"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Analizadores/Token");
const Analizador_Lexico_1 = require("./Analizadores/Analizador_Lexico");
const Analizador_Sintactico_1 = require("./Analizadores/Analizador_Sintactico");
exports.analyzer = (request, response) => {
    let analizador = new Analizador_Lexico_1.Analizador_Lexico();
    let sintactico = new Analizador_Sintactico_1.Analizador_Sintactico();
    let textoDocumento = request.body.code;
    let r = [];
    let listaTokens = analizador.analizador(textoDocumento);
    let listaTokensErrores = analizador.analizador_Error();
    listaTokens.push(new Token_1.Token(Token_1.Tipo.ULTIMO, "ultimo", 0, 0));
    let resultado = sintactico.parsear(listaTokens, listaTokensErrores);
    listaTokensErrores = sintactico.getListaErrores();
    console.log("Se ha concluido el analisis sintactico");
    if (listaTokensErrores.length > 0) {
        r = [
            {
                'listaErrores': listaTokensErrores,
                'listaToken': listaTokens
            }
        ];
    }
    else {
        let traduccionPY = resultado.traductorPY();
        r = [
            {
                'listaErrores': listaTokensErrores,
                'listaToken': listaTokens,
                'traduccion': traduccionPY
            }
        ];
    }
    response.send(r);
};
