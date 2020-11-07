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
    traductorPY() {
        let instruction = "";
        this.instructions_List.forEach(element => {
            instruction += element.traductorPY() + "\n\n";
            //console.log(element);
        });
        return instruction;
    }
    calcularEspaciadoPY() {
        throw new Error("Method not implemented.");
    }
}
exports.Abstrac_Sintactic_Tree = Abstrac_Sintactic_Tree;
