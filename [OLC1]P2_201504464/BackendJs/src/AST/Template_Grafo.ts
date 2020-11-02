export class Template_Grafo{

    id_Nodo: number;

    constructor(id:number){
        this.id_Nodo = id;
    }

    getId_Nodo(){
        return this.id_Nodo;
    }

    setId_Nodo(id:number){
        this.id_Nodo = id;
    }
}