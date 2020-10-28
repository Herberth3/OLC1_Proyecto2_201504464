import { Request, Response } from "express";
import Grammar = require('../Grammar/grammar');
import { Abstrac_Sintactic_Tree } from "./AST/Abstrac_Sintactic_Tree";

export let analyzer = (request: Request, response: Response)=>{

    let textoDocumento: string = request.body.code;
    
    let resultado = Grammar.parse(textoDocumento) as Abstrac_Sintactic_Tree;

    let traduccion = resultado.traductorJS();
    console.log(traduccion);

    let r = [
    ]
    response.send(r);
}