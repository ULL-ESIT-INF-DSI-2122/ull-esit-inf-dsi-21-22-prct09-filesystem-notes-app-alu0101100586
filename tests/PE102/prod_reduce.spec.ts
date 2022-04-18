import 'mocha';
import {expect} from 'chai';
import {ProdReduce} from '../../src/PE102/subclass/prod_reduce';

let test: ProdReduce = new ProdReduce([0, 1, 2, 3]);
let test_2: ProdReduce = new ProdReduce([8, 7, 25, 100]);

describe('Funcionamiento de la clase ProdReduce', () => {
   it('Se puede reducir [0, 1, 2, 3] a [6]', () => {
        test.run();
        expect(test.getArray()).to.be.eql([0]);
   });

   it('Se puede reducir [8, 7, 25, 100]', () => {
        test_2.run();
        expect(test_2.getArray()).to.be.eql([140000]);
   });
});