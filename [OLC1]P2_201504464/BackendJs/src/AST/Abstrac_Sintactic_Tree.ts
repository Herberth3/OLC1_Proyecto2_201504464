import { Template_Grafo } from "./Template_Grafo";
import { Template_Instruccion } from "./template_Instruccion";

export class Abstrac_Sintactic_Tree extends Template_Instruccion {

    instructions_List: Array<Template_Instruccion>;

    /**
     * 
     * @param instructions_List Lista de clase o interfaces
     */

    constructor(instructions_List: Array<Template_Instruccion>) {
        /** Contructor del extends **/
        super(1);

        this.instructions_List = instructions_List;
    }

    traductorJS(): string {
        let instruction = "";

        this.instructions_List.forEach(element => {
            instruction += element.traductorJS() + "\n\n";
            //console.log(element);
        });

        return instruction;
    }

    calcularEspaciadoJS(): string {
        throw new Error("Method not implemented.");
    }

    recolectarDot(t_g: Template_Grafo): string {
        /**
         * @var dot Recolecta el dot de graphviz durante el recorrido del AST.
         * @var esPrimero Boolean, 'true' primera instruccion, 'false' vienen mas instrucciones.
         * @var nodoPadre_G Nodo padre global, viene de la clase en donde se llamo al metodo 'recolectarDot'.
         * @var nodoPadre_A Nodo padre actual, almacena el ultimo padre con el que se trabajo.
         * @var nodoHijo Nodo hijo, almacena al hijo que tendra el padre actual.
         */
        let dot: string = "";
        let esPrimero: boolean = true;
        let nodoPadre_G: string = "nodo" + t_g.id_Nodo;;
        let nodoPadre_A: string = "";
        let nodoHijo: string = "";

        if (this.instructions_List.length > 0) {

            this.instructions_List.forEach(element => {

                t_g.id_Nodo++;
                nodoPadre_A = "nodo" + t_g.id_Nodo;
                dot += nodoPadre_A + "[label=\"LIST_INSTRUCTIONS\"]\n";

                if (esPrimero) {
                    esPrimero = false;
                } else {
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

    recolectorDotHijo(t_g: Template_Grafo, nodoPadre_G: string, nombreHijo: string): string {
        throw new Error("Method not implemented.");
    }
}