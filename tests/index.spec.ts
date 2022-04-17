import 'mocha';
import { expect } from 'chai';
import {add} from '../src/index';

describe('Prueba Suma de dos numeros', () => {
  it('7 + 3 = 10', () => {
    expect(add(7, 3)).to.be.eql(10);
  });
});