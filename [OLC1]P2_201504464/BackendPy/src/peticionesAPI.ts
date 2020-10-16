import { Request, Response } from "express";
import { Token } from "./Analizadores/Token";
import { Analizador_Lexico } from "./Analizadores/Analizador_Lexico";
import { Token_Error } from "./Analizadores/Token_Error";

export let analyzer = (request: Request, response: Response)=>{

    let analizador = new Analizador_Lexico();
    let textoDocumento: string = request.body.code;

    let listaTokens: Array<Token> = analizador.analizador(textoDocumento);
    let listaTokensErrores: Array<Token_Error> = analizador.analizador_Error();

    let r = [
        {
            'listaToken': listaTokens,
            'listaTokenErrores': listaTokensErrores
        }
    ]
    response.send(r);
}