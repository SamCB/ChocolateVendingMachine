# Chocolate Vending Machine

My progress on the Chocolate Vending Machine task after 1 hour.

## Usage:

To run tests:

```
yarn test
```

To run the program

```
yarn start
```

The project is represented through a command line interface.
Explanation of what is implemented below:

## Implementation

### Currently Implemented

* `MachineState` - The state of the machine is represented by a single object described in `types.ts`.
    It keeps track of the amount of money in the machine (`money`), the last error from user input (`error`)
    and the amount of change sitting in the change tray (`change`).

    Money is represented as the `Currency` interface, with dollars and cents tracked seperately.
    Money should not be tracked as a decimal number, not floating point, because of the complexities of floating
    point arithmatic.
* `reducers.ts` - State is updated through the use of reducers described in the `reducers.ts` file.
    These take the project state, and sometimes some additional input, and return an updated state.
    This is deliberately immutable and keeps the reducers pure, meaning there are no side effects.

    I considered using redux for state management, but given I only had an hour, I figured it would be quicker
    just to roll my own using similar principles.
* `AddMoney` reducer - is the only reducer currently implemented. It handles parsing of the input, return of error on
    invalid input and addition of money on expected input. In the case that the new state has 100c or more, it also
    converts cents to dollars.

    The `AddMoney` reducer is tested using jest in `test/addMoney.test.ts`;
* `display.ts` - for the sake of quick results, I implemented a basic display using `readline` and `async` functions.
    The program enters into a loop with `loop()` and each new transaction is handled by the `transaction()` function.
    Promises with async seemed like the most sensible approach to this, keeping the code base flat and clear.
    While readline doesn't return promises, it is very easy to implement, as per the `getInput()` function at the top
    of the file.

    As more reducers are implemented, functionality would change. For now, it only lets the user add money to their
    ballance. For one, I would probably have some tiered interface where you can seperately update ballance to selecting
    a product.

### Left to implement

* `BuySnack` reducer - attempt to buy snack and return change.
    If not enough money present, update state with error message.
* `Cancel` reducer - update state with all entered money as change.
* `RetrieveChange` reducer - remove spare change by clearing change state.
* `ClearError` reducer - clearing the error message from state. Currently the last displayed error is constant.
* Tests for the above reducers.
* Usage of above reducers in `display.ts`
