// expressionEvaluator.js
import { operatorRegistry } from './ops.js';
import { isNumeric, createNumber, createSymbol } from './types.js';

class ExpressionEvaluator {
    constructor(operatorRegistry) {
        this.operatorRegistry = operatorRegistry;
    }

    evaluate(tokens, context) {
        const stack = [];
        const outputQueue = [];
        const operatorStack = [];

        tokens.forEach(token => {
            if (isNumeric(token)) {
                outputQueue.push(createNumber(parseFloat(token)));
            } else if (context[token]) {
                outputQueue.push(context[token]);
            } else if (this.operatorRegistry.hasOperator(token)) {
                this.processOperator(token, operatorStack, outputQueue);
            } else if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                this.processRightParenthesis(operatorStack, outputQueue);
            } else {
                outputQueue.push(createSymbol(token));
            }
        });

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }

        return this.evaluateRPN(outputQueue);
    }

    processOperator(token, operatorStack, outputQueue) {
        const currentOp = this.operatorRegistry.getOperator(token);
        while (operatorStack.length > 0) {
            const topOperator = operatorStack[operatorStack.length - 1];
            if (topOperator === '(' ||
                !this.operatorRegistry.hasOperator(topOperator) ||
                (currentOp.associativity === 'left' && currentOp.precedence <= this.operatorRegistry.getOperator(topOperator).precedence) ||
                (currentOp.associativity === 'right' && currentOp.precedence < this.operatorRegistry.getOperator(topOperator).precedence)) {
                break;
            }
            outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
    }

    processRightParenthesis(operatorStack, outputQueue) {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
            outputQueue.push(operatorStack.pop());
        }
        if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === '(') {
            operatorStack.pop();
        } else {
            throw new Error('Mismatched parentheses');
        }
    }

    // big steppers
    evaluateRPN(queue) {
        const stack = [];
        queue.forEach(token => {
            if (typeof token === 'string' && this.operatorRegistry.hasOperator(token)) {
                const b = stack.pop();
                const a = stack.pop();
                stack.push(this.operatorRegistry.getOperator(token).operation(a, b));
            } else {
                stack.push(token);
            }
        });
        return stack[0];
    }
}

export { ExpressionEvaluator };
