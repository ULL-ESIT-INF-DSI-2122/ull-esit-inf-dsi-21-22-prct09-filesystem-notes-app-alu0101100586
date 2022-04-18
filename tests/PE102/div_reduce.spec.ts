import 'mocha';
import {expect} from 'chai';
import {DivReduce} from '../../src/PE102/subclass/div_reduce';

let test: DivReduce = new DivReduce([0, 1, 2, 3]);
let test_2: DivReduce = new DivReduce([100, 1, 2, 3]);

describe('Funcionamiento de la clase DivReduce', () => {
   it('Se puede reducir [0, 1, 2, 3] a [6]', () => {
        test.run();
        expect(test.getArray()).to.be.eql([0]);
   });

   it('Se puede reducir [100, 1, 2, 3]', () => {
        test_2.run();
        expect(test_2.getArray()).to.be.eql([17]);
   });
});