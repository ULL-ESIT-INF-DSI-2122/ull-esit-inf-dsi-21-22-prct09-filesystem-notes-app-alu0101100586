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
        this.pre_reduce();
        this.onlyOneItem();
        this.after_reduce();
    }

    /**
     * Metodo abstracto que realizará la reduccion del array
     */
    protected abstract onlyOneItem(): void;

    /**
     * Metodo Hook para antes del reduce
     */
    protected pre_reduce(){
      console.log('');
    };

    /**
     * Metodo Hook para despues del reduce
     */
    protected after_reduce(){
      console.log('');
    };

    /**
     * Funcion ue devuelve el array
     */
    getArray() {
        return this.array;
    }
}