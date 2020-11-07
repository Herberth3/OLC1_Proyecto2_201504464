import { Request, Response } from "express";
import { Tipo, Token } from "./Analizadores/Token";
import { Analizador_Lexico } from "./Analizadores/Analizador_Lexico";
import { Token_Error } from "./Analizadores/Token_Error";
import { Analizador_Sintactico } from "./Analizadores/Analizador_Sintactico";
import { Abstrac_Sintactic_Tree } from "./AST/Abstrac_Sintactic_Tree";

export let analyzer = (request: Request, response: Response)=>{

    let analizador = new Analizador_Lexico();
    let sintactico = new Analizador_Sintactico();
    let textoDocumento: string = request.body.code;
    let r = [];

    let listaTokens: Array<Token> = analizador.analizador(textoDocumento);
    let listaTokensErrores: Array<Token_Error> = analizador.analizador_Error();

    listaTokens.push(new Token(Tipo.ULTIMO, "ultimo", 0, 0));

    let resultado = sintactico.parsear(listaTokens, listaTokensErrores) as Abstrac_Sintactic_Tree;
    listaTokensErrores = sintactico.getListaErrores();
    console.log("Se ha concluido el analisis sintactico");

    let traduccion = resultado.traductorPY();
    console.log(traduccion);

    if (listaTokensErrores.length > 0) {
        r = [
            {
                'listaErrores': listaTokensErrores,
                'listaToken': listaTokens
            }
        ]
    } else {

        let traduccionPY = "";

        r = [
            {
                'listaErrores': listaTokensErrores,
                'listaToken': listaTokens,
                'traduccion': traduccionPY
            }
        ]
    }


    response.send(r);
}