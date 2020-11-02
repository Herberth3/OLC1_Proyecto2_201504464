import { Request, Response } from "express";
import Grammar = require('../Grammar/grammar');
import { Abstrac_Sintactic_Tree } from "./AST/Abstrac_Sintactic_Tree";
import { Template_Grafo } from "./AST/Template_Grafo";

export let analyzer = (request: Request, response: Response) => {

    let textoDocumento: string = request.body.code;
    var t_g = new Template_Grafo(0);

    let resultado = Grammar.parse(textoDocumento) as Abstrac_Sintactic_Tree;

    let traduccion = resultado.traductorJS();
    console.log(traduccion);

    let dot = "digraph G{\n";
    dot += "node[shape = box, fontsize = 8.0]\n\n"
    dot += "nodo0[label=\"INICIO\"]\n";

    dot += resultado.recolectarDot(t_g);

    dot += "\n}";
    console.log(dot);

    let r = [
    ]
    response.send(r);
}