"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Grammar = require("../Grammar/grammar");
exports.analyzer = (request, response) => {
    let textoDocumento = request.body.code;
    let resultado = Grammar.parse(textoDocumento);
    let traduccion = resultado.traductorJS();
    console.log(traduccion);
    let r = [];
    response.send(r);
};
