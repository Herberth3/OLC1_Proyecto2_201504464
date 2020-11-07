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

    traductorPY(): string {
        let instruction = "";

        this.instructions_List.forEach(element => {
            instruction += element.traductorPY() + "\n\n";
            //console.log(element);
        });

        return instruction;
    }

    calcularEspaciadoPY(): string {
        throw new Error("Method not implemented.");
    }
}