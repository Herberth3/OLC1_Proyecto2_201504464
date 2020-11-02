"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("./template_Instruccion");
class Abstrac_Sintactic_Tree extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param instructions_List Lista de clase o interfaces
     */
    constructor(instructions_List) {
        /** Contructor del extends **/
        super(1);
        this.instructions_List = instructions_List;
    }
    traductorJS() {
        let instruction = "";
        this.instructions_List.forEach(element => {
            instruction += element.traductorJS() + "\n\n";
            //console.log(element);
        });
        return instruction;
    }
    calcularEspaciadoJS() {
        throw new Error("Method not implemented.");
    }
    recolectarDot(t_g) {
        /**
         * @var dot Recolecta el dot de graphviz durante el recorrido del AST.
         * @var esPrimero Boolean, 'true' primera instruccion, 'false' vienen mas instrucciones.
         * @var nodoPadre_G Nodo padre global, viene de la clase en donde se llamo al metodo 'recolectarDot'.
         * @var nodoPadre_A Nodo padre actual, almacena el ultimo padre con el que se trabajo.
         * @var nodoHijo Nodo hijo, almacena al hijo que tendra el padre actual.
         */
        let dot = "";
        let esPrimero = true;
        let nodoPadre_G = "nodo" + t_g.id_Nodo;
        ;
        let nodoPadre_A = "";
        let nodoHijo = "";
        if (this.instructions_List.length > 0) {
            this.instructions_List.forEach(element => {
                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"LIST_INSTRUCTIONS\"]\n";
                if (esPrimero) {
                    esPrimero = false;
                }
                else {
                    dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                }
                t_g.id_Nodo++;
                nodoHijo = "nodo" + t_g.id_Nodo;
                dot += nodoHijo + "[label=\"INSTRUCTIONS\"]\n";
                dot += nodoPadre_A + " -> " + nodoHijo + "\n";
                dot += element.recolectarDot(t_g);
                nodoHijo = nodoPadre_A;
            });
            dot += nodoPadre_G + " -> " + nodoPadre_A;
        }
        return dot;
    }
    recolectorDotHijo(t_g, nodoPadre_G, nombreHijo) {
        throw new Error("Method not implemented.");
    }
}
exports.Abstrac_Sintactic_Tree = Abstrac_Sintactic_Tree;
