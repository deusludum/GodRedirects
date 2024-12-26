// operators.js
import { types, getType, createNumber, createExpression } from './types.js';

class OperatorRegistry {
    constructor() {
        this.operators = {};
    }

    addOperator(symbol, precedence, associativity, operation) {
        this.operators[symbol] = { precedence, associativity, operation };
    }

    getOperator(symbol) {
        return this.operators[symbol];
    }

    hasOperator(symbol) {
        return symbol in this.operators;
    }
}

const registry = new OperatorRegistry();

// Define basic operators
registry.addOperator('+', 1, 'left', (a, b) => {
    if (getType(a) === types.NUMBER && getType(b) === types.NUMBER) {
        return createNumber(a.value + b.value);
    }
    return createExpression('+', [a, b]);
});

registry.addOperator('-', 1, 'left', (a, b) => {
    if (getType(a) === types.NUMBER && getType(b) === types.NUMBER) {
        return createNumber(a.value - b.value);
    }
    return createExpression('-', [a, b]);
});

registry.addOperator('*', 2, 'left', (a, b) => {
    if (getType(a) === types.NUMBER && getType(b) === types.NUMBER) {
        return createNumber(a.value * b.value);
    }
    return createExpression('*', [a, b]);
});

registry.addOperator('/', 2, 'left', (a, b) => {
    if (getType(a) === types.NUMBER && getType(b) === types.NUMBER) {
        if (b.value === 0) throw new Error('Division by zero');
        return createNumber(a.value / b.value);
    }
    return createExpression('/', [a, b]);
});

registry.addOperator('^', 3, 'right', (a, b) => {
    if (getType(a) === types.NUMBER && getType(b) === types.NUMBER) {
        return createNumber(Math.pow(a.value, b.value));
    }
    return createExpression('^', [a, b]);
});

export { registry as operatorRegistry };
