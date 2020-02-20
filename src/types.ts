export interface Currency {
  dollars: number;
  cents: number;
}

export interface MachineState {
  money: Currency;
  error?: string;
  change?: Currency;
}

export interface Product {
  name: string;
  price: Currency;
}

export function createState(): MachineState {
  return {
    money: {dollars: 0, cents: 0}
  };
}
