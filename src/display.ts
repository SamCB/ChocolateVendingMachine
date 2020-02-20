import { createInterface } from 'readline';
import {createState, MachineState, Currency} from './types';
import {Products} from './Products';
import {AddMoney} from './reducers';

type interfaceType = ReturnType<typeof createInterface>;

async function getInput(rl: interfaceType, promptMsg: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(promptMsg, resolve);
  });
}

function moneyDisplay(money: Currency): string {
  return `\$${money.dollars}.${money.cents}`;
}

function stateDisplay(rl: interfaceType, state: MachineState) {
  rl.write('\n');
  rl.write(`Current Ballance: ${moneyDisplay(state.money)}\n`);
  if (state.error) {
    rl.write(`Error: "${state.error}"\n`);
  }
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const productSelection = Products.map(({name, price}, index) => {
  return `${alphabet[index]}) ${name}: ${moneyDisplay(price)}`;
}).join('\n');

async function transaction(rl: interfaceType, state: MachineState): Promise<MachineState> {
  let transactionState = {...state};
  while (true) {
    stateDisplay(rl, transactionState);
    const input = await getInput(
      rl,
      `Enter Money or Select a Product:\n${productSelection}\n`
    );
    transactionState = AddMoney({enteredResult: input}, transactionState);
  };

  // Since most functionality is missing, we're not going to get here.
  // return a clean state.
  return Promise.resolve(createState());
}

export async function loop() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let state = createState();
  while (true) {
    state = await transaction(rl, state);
  }
}

