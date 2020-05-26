import {
    BinaryExpression, CellRange,
    ErrorExpression,
    Expression,
    FunctionCall,
    Literal, ValueArray,
    Variable,
} from "@/parser/helpers/expression";

const lettersToNum = (str: string) => {
    let decimal = 0;
    let letters = str.split("");
    for (let i = letters.length - 1; i >= 0; i--) {
        decimal += (letters[i].charCodeAt(0) - 64) * (Math.pow(26, letters.length - (i + 1)));
    }
    return decimal;
};

const numToLetters = (num: number) => {
    const baseChar = ("A").charCodeAt(0);
    let letters = "";
    do {
        num -= 1;
        letters = String.fromCharCode(baseChar + (num % 26)) + letters;
        num = (num / 26) >> 0;
    } while (num > 0);
    return letters.toUpperCase();
};

const rangeToArray = (range: CellRange): ValueArray => {
    const [startCol, startRow] = range.start.value.split(/([0-9]+)/g);
    const [endCol, endRow] = range.end.value.split(/([0-9]+)/g);
    const [smallerCol, largerCol] = startCol < endCol ? [lettersToNum(startCol), lettersToNum(endCol)] : [lettersToNum(startCol), lettersToNum(endCol)];
    const [smallerRow, largerRow] = [Number(startRow), Number(endRow)].sort();
    const vars: Variable[] = [];
    for (let i = smallerCol; i <= largerCol; i++) {
        for (let j = smallerRow; j <= largerRow; j++) {
            vars.push({
                type: "Variable",
                value: `${numToLetters(i)}${j}`,
            });
        }
    }
    return {
        type: "Array",
        values: vars,
    };
};

const TypeGuard = <T, U extends T> (val: T, result: boolean): val is U => result;

const isLiteral = (expr: Expression): expr is Literal => expr.type === "Literal";

const isError = (expr: Expression): expr is ErrorExpression => expr.type === "Error";

const isVariable = (expr: Expression): expr is Variable => expr.type === "Variable";

const isBinaryExpression = (expr: Expression): expr is BinaryExpression => expr.type === "BinaryExpression";

const isFunctionCall = (expr: Expression): expr is FunctionCall => expr.type === "FunctionCall";

export { TypeGuard, isLiteral, isError, isVariable, isBinaryExpression, isFunctionCall, rangeToArray };
