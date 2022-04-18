/**
 * Clase que hace uso de el patron Template Method para realizar un reduce de un vector
 */
export abstract class Reduce {
    protected array: number[];

    /**
     * Constructor de al clase Reduce, el cuel inicializa el array a uno pasado como parametro
     * @param array array al que igualar
     */
    constructor(array: number[]) {
        this.array = array;
    }

    /**
     * Metodo plantilla que defiene el esqueleto de la propia clase
     */
    public run() {
        this.onlyOneItem();
    }

    /**
     * Metodo abstracto que realizará la reduccion del array
     */
    abstract onlyOneItem(): void;

    /**
     * Funcion ue devuelve el array
     */
    getArray() {
        return this.array;
    }
}