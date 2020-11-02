"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_Instruccion_1 = require("../template_Instruccion");
const Types_1 = require("../Types");
class Identifier extends template_Instruccion_1.Template_Instruccion {
    /**
     *
     * @param id Este identificador funciona para el arreglo de asignaciones dentro de una declaracion.
     * @param parameters    Arreglo de parametros en una llamada a metodo, puede ser null para los otros casos.
     * @param tipo  Tipo de ejecucion, puede ser un id, llamada metodo, pos incremento, pos decremento.
     * @param call_method_N Booleano, 'true' llamada metodo con punto y coma, 'false' llamada metodo sin punto y coma.
     * @param columna   Columna donde se encuentra el identificador.
     */
    constructor(id, parameters, tipo, call_method_N, columna) {
        super(columna);
        this.identificador = id;
        this.parametros = parameters;
        this.tipo_Ejecucion = tipo;
        this.llamada_Metodo_Normal = call_method_N;
    }
    traductorJS() {
        switch (this.tipo_Ejecucion) {
            case Types_1.Type_Operation.IDENTIFICADOR:
                return this.identificador;
            case Types_1.Type_Operation.LLAMADA_METODO:
                let llamada_M = "";
                if (this.llamada_Metodo_Normal) {
                    llamada_M = this.calcularEspaciadoJS() + this.identificador + "(";
                    for (let i = 0; i < this.parametros.length; i++) {
                        const element = this.parametros[i];
                        if (i == this.parametros.length - 1) {
                            llamada_M += element.traductorJS();
                        }
                        else {
                            llamada_M += element.traductorJS() + ", ";
                        }
                    }
                    llamada_M += ");\n\n";
                }
                else {
                    llamada_M = this.identificador + "(";
                    for (let i = 0; i < this.parametros.length; i++) {
                        const element = this.parametros[i];
                        if (i == this.parametros.length - 1) {
                            llamada_M += element.traductorJS();
                        }
                        else {
                            llamada_M += element.traductorJS() + ", ";
                        }
                    }
                    llamada_M += ")";
                }
                return llamada_M;
            case Types_1.Type_Operation.POS_DECREMENTO:
                return this.calcularEspaciadoJS() + this.identificador + "--;\n\n";
            case Types_1.Type_Operation.POS_INCREMENTO:
                return this.calcularEspaciadoJS() + this.identificador + "++;\n\n";
        }
    }
    calcularEspaciadoJS() {
        let espacios = "";
        let i = 1;
        while (i < this.columna) {
            espacios += " ";
            i++;
        }
        return espacios;
    }
    recolectarDot(t_g) {
        let dot = "";
        let esPrimero = true;
        let nodoPadre_G = "nodo" + t_g.id_Nodo;
        let nodoPadre_A = "";
        let nodoHijo = "";
        if (this.tipo_Ejecucion == Types_1.Type_Operation.LLAMADA_METODO || this.tipo_Ejecucion == Types_1.Type_Operation.POS_DECREMENTO
            || this.tipo_Ejecucion == Types_1.Type_Operation.POS_INCREMENTO) {
            t_g.id_Nodo++;
            nodoHijo = "nodo" + t_g.id_Nodo;
            switch (this.tipo_Ejecucion) {
                case Types_1.Type_Operation.LLAMADA_METODO:
                    dot += nodoHijo + "[label=\"LLAMADA_METODO\"]\n";
                    break;
                case Types_1.Type_Operation.POS_DECREMENTO:
                    dot += nodoHijo + "[label=\"POS_DECREMENTO\"]\n";
                    break;
                case Types_1.Type_Operation.POS_INCREMENTO:
                    dot += nodoHijo + "[label=\"POS_INCREMENTO\"]\n";
                    break;
            }
            dot += nodoPadre_G + " -> " + nodoHijo + "\n";
            /** AHORA EL NODOPADRE_G ES UNO DE LOS NODOS ANTERIORES **/
            nodoPadre_G = nodoHijo;
        }
        switch (this.tipo_Ejecucion) {
            case Types_1.Type_Operation.IDENTIFICADOR:
                dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.identificador);
                break;
            case Types_1.Type_Operation.LLAMADA_METODO:
                dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.identificador);
                if (this.parametros.length > 0) {
                    this.parametros.forEach(element => {
                        t_g.id_Nodo++;
                        nodoPadre_A = "nodo" + t_g.id_Nodo;
                        dot += nodoPadre_A + "[label=\"LIST_PRIMITIVOS\"]\n";
                        if (esPrimero) {
                            dot += nodoPadre_G + " -> " + nodoPadre_A + "\n";
                            esPrimero = false;
                        }
                        else {
                            dot += nodoHijo + " -> " + nodoPadre_A + "\n";
                        }
                        dot += element.recolectarDot(t_g);
                        nodoHijo = nodoPadre_A;
                    });
                }
                break;
            case Types_1.Type_Operation.POS_DECREMENTO:
                dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.identificador);
                dot += this.recolectorDotHijo(t_g, nodoPadre_G, "--");
                break;
            case Types_1.Type_Operation.POS_INCREMENTO:
                dot += this.recolectorDotHijo(t_g, nodoPadre_G, this.identificador);
                dot += this.recolectorDotHijo(t_g, nodoPadre_G, "++");
                break;
        }
        return dot;
    }
    recolectorDotHijo(t_g, nodoPadre_G, nombreHijo) {
        let dot = "";
        let nodoHijo = "";
        t_g.id_Nodo++;
        nodoHijo = "nodo" + t_g.id_Nodo;
        dot += nodoHijo + "[label=\"" + nombreHijo + "\"]\n";
        dot += nodoPadre_G + " -> " + nodoHijo + "\n";
        return dot;
    }
}
exports.Identifier = Identifier;
