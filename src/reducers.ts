import {keys} from 'lodash';
import {MachineState, Currency} from './types';

export interface AddMoneyInput {
  enteredResult: string;
}
const addMoneyResults: {[enteredResult: string]: Currency} = {
  '10c': {dollars: 0, cents: 10},
  '20c': {dollars: 0, cents: 20},
  '50c': {dollars: 0, cents: 50},
  '$1': {dollars: 1, cents: 0},
  '$2': {dollars: 2, cents: 0},
};
export function AddMoney({enteredResult}: AddMoneyInput, state: MachineState): MachineState {
  const currency = addMoneyResults[enteredResult];
  if (currency !== undefined) {
    let money = {
      dollars: state.money.dollars + currency.dollars,
      cents: state.money.cents + currency.cents,
    }; 
    while (money.cents >= 100) {
      money = {
        dollars: money.dollars + 1,
        cents: money.cents - 100,
      };
    }
    return {
      ...state,
      money 
    };
  }
  return {
    ...state,
    error: `Value "${enteredResult}" invalid. Please enter one of "${keys(addMoneyResults)}"`,
  };
}

export interface BuySnackInput {
  enteredResult: string;
}
export function BuySnack(input: BuySnackInput, state: MachineState): MachineState {
  return state;
}

export function Cancel(state: MachineState): MachineState {
  return state;
}

export function RetrieveChange(state: MachineState): MachineState {
  return state;
}

export function ClearError(state: MachineState): MachineState {
  return state;
}
