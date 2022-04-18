import {Reduce} from '../abstract_class/reduce';

/**
 * Clase que realiza un reduce sumando los valores del array
 */
export class DivReduce extends Reduce {

    /**
     * Constructor de la clasee DivReduce que inicializa el atributo de tipo number[]
     * @param array 
     */
    constructor(protected array: number[]){
        super(array);
    }

    /**
     * Realiza el reduce del array a un solo elemento que es el restultado de la division de los elementos
     */
    protected onlyOneItem(): void {
        let aux: number = 0;
        this.array.forEach((item, index) => {
            if(index == 0) {
                aux = item;
            } else {
                aux /= item;
            }
        });
        this.array = [];
        this.array.push(Math.round(aux));
    }

    /**
     * Metodo Hook para el antes del paso
     */
    protected pre_reduce() {
        console.log(`DIV: Obteniendo los elementos del array`)
    }

    /**
     * Metodo Hook para cuando termina el paso
     */
    protected after_reduce() {
        console.log(`DIV: Se ha reducido el array a un solo elemento`)
    }
}