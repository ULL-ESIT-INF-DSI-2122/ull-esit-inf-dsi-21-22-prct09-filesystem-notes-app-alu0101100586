import 'mocha';
import {expect} from 'chai';
import {SubReduce} from '../../src/PE102/subclass/sub_reduce';

let test: SubReduce = new SubReduce([0, 1, 2, 3]);
let test_2: SubReduce = new SubReduce([8, 7, 25, 100]);

describe('Funcionamiento de la clase SubReduce', () => {
   it('Se puede reducir [0, 1, 2, 3] a [6]', () => {
        test.run();
        expect(test.getArray()).to.be.eql([-6]);
   });

   it('Se puede reducir [8, 7, 25, 100]', () => {
        test_2.run();
        expect(test_2.getArray()).to.be.eql([-124]);
   });
});