import {Currency, MachineState} from '../types';
import {AddMoney} from '../reducers';

const inputs: [string, Currency][] = [
  ['10c', {dollars: 0, cents: 10}],
  ['20c', {dollars: 0, cents: 20}],
  ['50c', {dollars: 0, cents: 50}],
  ['$1', {dollars: 1, cents: 0}],
  ['$2', {dollars: 2, cents: 0}],
];

const emptyState: MachineState = {
  money: {dollars: 0, cents: 0}
};

const existingState: MachineState = {
  money: {dollars: 1, cents: 20}
};

describe('AddMoney Reducer', () => {
  it.each(inputs)('should accept each valid input with an empty state', (input, expectedMoney) => {
    const retval = AddMoney({enteredResult: input}, emptyState);
    expect(retval.money).toEqual(expectedMoney);
  });

  it.each(inputs)('should add to existing state', (input, expectedMoney) => {
    const retval = AddMoney({enteredResult: input}, existingState);
    expect(retval.money).toEqual({
      dollars: existingState.money.dollars + expectedMoney.dollars,
      cents: existingState.money.cents + expectedMoney.cents,
    });
  });

  it.each(inputs)('should not make unexpected changes to state', (input) => {
    const retval = AddMoney({enteredResult: input}, existingState);
    expect(retval.error).toBeUndefined();
    expect(retval.change).toBeUndefined();
  });

  it.each(['5c', 'foobar', ''])('should return an error for unexpected currency', (input) => {
    const retval = AddMoney({enteredResult: input}, existingState);
    expect(typeof retval.error).toBe('string');
    expect(retval.money).toEqual(existingState.money);
    expect(retval.change).toBeUndefined();
  });

  it('should round cents to dollars when equal or more than 100c are input', () => {
    const retvalA = AddMoney({enteredResult: '50c'}, {money: {dollars: 1, cents: 70}});
    const retvalB = AddMoney({enteredResult: '20c'}, {money: {dollars: 2, cents: 80}});

    expect(retvalA.money).toEqual({dollars: 2, cents: 20});
    expect(retvalB.money).toEqual({dollars: 3, cents: 0});
  });
});
