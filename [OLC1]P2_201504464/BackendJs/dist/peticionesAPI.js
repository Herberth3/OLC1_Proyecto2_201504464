"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Grammar = require("../Grammar/grammar");
const Template_Grafo_1 = require("./AST/Template_Grafo");
const Listas_1 = require("./TOKENS/Listas");
exports.analyzer = (request, response) => {
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
    let textoDocumento = request.body.code;
    var t_g = new Template_Grafo_1.Template_Grafo(0);
    let r = [];
    Listas_1.Listas.setListaTokens([]);
    Listas_1.Listas.setListaErrores([]);
    let resultado = Grammar.parse(textoDocumento);
    let listaToken = Listas_1.Listas.getListaTokens();
    let listaErrores = Listas_1.Listas.getListaErrores();
    if (listaErrores.length > 0) {
        r = [
            {
                'listaErrores': listaErrores,
                'listaToken': listaToken
            }
        ];
    }
    else {
        let traduccionJS = resultado.traductorJS();
        let dot = "digraph G{\n";
        dot += "node[shape = box, fontsize = 8.0]\n\n";
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
        ];
    }
    response.send(r);
};
