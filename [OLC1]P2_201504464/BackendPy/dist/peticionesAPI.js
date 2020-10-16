"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Analizador_Lexico_1 = require("./Analizadores/Analizador_Lexico");
var analizador = new Analizador_Lexico_1.Analizador_Lexico();
exports.analyzer = (request, response) => {
    let textoDocumento = request.body.code;
    console.log(textoDocumento);
    let listaTokens = analizador.analizador(textoDocumento);
    let listaErrores = analizador.analizador_Error();
    let r = [
        {
            'listaToken': listaTokens
        }
    ];
    response.send(r);
};
