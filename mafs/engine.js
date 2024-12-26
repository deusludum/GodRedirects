import { operatorRegistry } from './ops.js';
import { ExpressionEvaluator } from './evaluate.js';
import { createNumber, createSymbol } from './types.js';

export default class MathEngine {
    constructor() {
        this.evaluator = new ExpressionEvaluator(operatorRegistry);
    }

    tokenize(expr) {
        const regex = /\d+\.?\d*|[a-zA-Z]+|\s?[+\-*/]\s?|\(\s?|\)\s?/g;
        return expr.match(regex);
    }

    evaluate(expression, context = {}) {
        const tokens = this.tokenize(expression);
        return this.evaluator.evaluate(tokens, context);
    }

    addOperator(symbol, precedence, associativity, operation) {
        operatorRegistry.addOperator(symbol, precedence, associativity, operation);
    }
}
