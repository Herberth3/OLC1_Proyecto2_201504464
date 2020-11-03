"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoError;
(function (TipoError) {
    TipoError[TipoError["LEXICO"] = 0] = "LEXICO";
    TipoError[TipoError["SINTACTICO"] = 1] = "SINTACTICO";
})(TipoError = exports.TipoError || (exports.TipoError = {}));
class Token_Error {
    constructor(caracter, tipoError, descripcion, fila, columna) {
        this.caracterError = caracter;
        this.tipoTokenError = tipoError;
        this.descripcionError = descripcion;
        this.filaError = fila;
        this.columnaError = columna;
        this.tipoTokenErrorEnString = this.getTipoTokenErrorEnString();
    }
    getCaracterError() {
        return this.caracterError;
    }
    getTipoError() {
        return this.tipoTokenError;
    }
    getDescripcionError() {
        return this.descripcionError;
    }
    getFilaError() {
        return this.filaError;
    }
    getColumnaError() {
        return this.columnaError;
    }
    getTipoTokenErrorEnString() {
        let nombreTokenError = "";
        switch (this.tipoTokenError) {
            case TipoError.LEXICO:
                nombreTokenError = "Lexico";
                break;
            case TipoError.SINTACTICO:
                nombreTokenError = "Sintactico";
                break;
            default:
                nombreTokenError = "Desconocido";
                break;
        }
        return nombreTokenError;
    }
}
exports.Token_Error = Token_Error;
