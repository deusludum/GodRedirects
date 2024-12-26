const types = {
    NUMBER: 'number',
    SYMBOL: 'symbol',
    EXPRESSION: 'expression'
};

function getType(obj) {
    if (typeof obj === 'number') return types.NUMBER;
    if (typeof obj === 'string') return types.SYMBOL;
    if (obj && obj.type === types.EXPRESSION) return types.EXPRESSION;
    throw new Error(`Unknown type: ${obj}`);
}

function createNumber(value) {
    return { type: types.NUMBER, value };
}

function createSymbol(name) {
    return { type: types.SYMBOL, name };
}

function createExpression(operator, operands) {
    return { type: types.EXPRESSION, operator, operands };
}

function isNumeric(token) {
    return !isNaN(parseFloat(token)) && isFinite(token);
}

export { types, getType, createNumber, createSymbol, createExpression, isNumeric };
