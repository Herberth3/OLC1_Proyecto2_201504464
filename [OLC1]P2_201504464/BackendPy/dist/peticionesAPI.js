"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Analizador_Lexico_1 = require("./Analizadores/Analizador_Lexico");
exports.analyzer = (request, response) => {
    let analizador = new Analizador_Lexico_1.Analizador_Lexico();
    let textoDocumento = request.body.code;
    let listaTokens = analizador.analizador(textoDocumento);
    let listaTokensErrores = analizador.analizador_Error();
    let r = [
        {
            'listaToken': listaTokens,
            'listaTokenErrores': listaTokensErrores
        }
    ];
    response.send(r);
};
