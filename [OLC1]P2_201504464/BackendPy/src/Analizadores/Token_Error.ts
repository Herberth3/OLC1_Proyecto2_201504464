export enum TipoError {
    LEXICO,
    SINTACTICO
}

export class Token_Error {
    private caracterError: string;
    private tipoTokenError: TipoError;
    private descripcionError: string;
    private filaError: number;
    private columnaError: number;

    constructor(caracter: string, tipoError: TipoError, descripcion: string, fila: number, columna: number) {
        this.caracterError = caracter;
        this.tipoTokenError = tipoError;
        this.descripcionError = descripcion;
        this.filaError = fila;
        this.columnaError = columna;
    }

    getCaracterError(): string {
        return this.caracterError;
    }

    getTipoError(): TipoError {
        return this.tipoTokenError;
    }

    getDescripcionError(): string {
        return this.descripcionError;
    }

    getFilaError(): number {
        return this.filaError;
    }

    getColumnaError(): number {
        return this.columnaError;
    }

    getTipoErrorEnString(): string {
        let nombreTokenError: string = "";

        switch (this.tipoTokenError) {
            case TipoError.LEXICO:
                nombreTokenError = "Lexico";
                break;
            case TipoError.SINTACTICO:
                nombreTokenError = "Sintactico";
                break;
            default:
                nombreTokenError = "Desconocido"
                break;
        }
        return nombreTokenError;
    }
}