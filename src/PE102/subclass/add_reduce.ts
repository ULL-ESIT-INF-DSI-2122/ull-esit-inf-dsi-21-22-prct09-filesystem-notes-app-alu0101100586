import {Reduce} from '../abstract_class/reduce';

/**
 * Clase que realiza un reduce sumando los valores del array
 */
export class AddReduce extends Reduce {

    /**
     * Constructor de la clasee AddReduce que inicializa el atributo de tipo number[]
     * @param array 
     */
    constructor(protected array: number[]){
        super(array);
    }

    /**
     * Realiza el reduce del array a un solo elemento que es el restultado de la suma de los elementos
     */
    protected onlyOneItem(): void {
        let aux: number = 0;
        this.array.forEach((item) => {
            aux += item;
        });
        this.array = [];
        this.array.push(aux);
    }

    /**
     * Metodo Hook para el antes del paso
     */
    protected pre_reduce() {
        console.log(`ADD: Obteniendo los elementos del array`)
    }

    /**
     * Metodo Hook para cuando termina el paso
     */
    protected after_reduce() {
        console.log(`ADD: Se ha reducido el array a un solo elemento`)
    }
}