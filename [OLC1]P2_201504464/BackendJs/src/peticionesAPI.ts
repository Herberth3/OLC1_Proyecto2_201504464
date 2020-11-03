import { Request, Response } from "express";
import Grammar = require('../Grammar/grammar');
import { Abstrac_Sintactic_Tree } from "./AST/Abstrac_Sintactic_Tree";
import { Template_Grafo } from "./AST/Template_Grafo";
import { Listas } from "./TOKENS/Listas";
import { Token } from "./TOKENS/Token";
import { Token_Error } from "./TOKENS/Token_Error";

export let analyzer = (request: Request, response: Response) => {

    /**
     * @var textoDocumento Almacena la cadena de texto del editor para ser analizada.
     * @var t_g Instancia de Template_Grafo, enviada como parametro en el metodo 'recolectarDot', su atributo id_Nodo identificara cada nodo en el grafo.
     * @instance Listas.setListaTokens(), en cada analisis se le envia antes un array vacio para poder llenar la lista con nuevos tokens.
     * @instance Listas.setListaErrores(), en cada analisis se le envia antes un array vacio para poder llenar la lista con nuevos errores.
     * @var resultado Almacena lo recolectado en el analisis como tipo clase Abstrac_Sintactic_Tree.
     * @var listaToken Lista con los tokens recolectados durante el analisis.
     * @var listaErrores Lista con los errores recolectados durante el analisis.
     * @var traduccionJS Almacena el string con la traduccion al lenguaje Javascript.
     * @var dot Almacena el string con la estructura dot para el graficador Graphviz.
     * @var r Json que se le enviara como respuesta al cliente.
     */
    let textoDocumento: string = request.body.code;
    var t_g = new Template_Grafo(0);
    let r = [];
    Listas.setListaTokens([]);
    Listas.setListaErrores([]);

    let resultado = Grammar.parse(textoDocumento) as Abstrac_Sintactic_Tree;

    let listaToken: Array<Token> = Listas.getListaTokens();
    let listaErrores: Array<Token_Error> = Listas.getListaErrores();

    if (listaErrores.length > 0) {
        r = [
            {
                'listaErrores': listaErrores,
                'listaToken': listaToken
            }
        ]
    } else {

        let traduccionJS = resultado.traductorJS();

        let dot = "digraph G{\n";
        dot += "node[shape = box, fontsize = 8.0]\n\n"
        dot += "nodo0[label=\"INICIO\"]\n";

        dot += resultado.recolectarDot(t_g);

        dot += "\n}";


        r = [
            {
                'listaErrores': listaErrores,
                'listaToken': listaToken,
                'traduccion': traduccionJS,
                'dot': dot
            }
        ]
    }

    response.send(r);
}