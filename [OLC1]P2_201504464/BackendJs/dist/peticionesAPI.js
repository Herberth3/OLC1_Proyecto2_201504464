"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Grammar = require("../Grammar/grammar");
const Template_Grafo_1 = require("./AST/Template_Grafo");
exports.analyzer = (request, response) => {
    let textoDocumento = request.body.code;
    var t_g = new Template_Grafo_1.Template_Grafo(0);
    let resultado = Grammar.parse(textoDocumento);
    let traduccion = resultado.traductorJS();
    console.log(traduccion);
    let dot = "digraph G{\n";
    dot += "node[shape = box, fontsize = 8.0]\n\n";
    dot += "nodo0[label=\"INICIO\"]\n";
    dot += resultado.recolectarDot(t_g);
    dot += "\n}";
    console.log(dot);
    let r = [];
    response.send(r);
};
