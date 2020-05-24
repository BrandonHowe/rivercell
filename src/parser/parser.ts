import { isBinaryExpression, isError, isFunctionCall, isLiteral, isVariable, TypeGuard } from "./helpers/parser";
import { Expression, BinaryExpression, Literal, ErrorExpression, FunctionCall } from "./helpers/expression";
import { builtInFuncs } from "./helpers/builtInFuncs";
import parser from "./lexer";

type Cell = number | string;

const parseBinaryExpression = (expr: BinaryExpression, cells: Record<string, Cell>, functions: Record<string, Function>): Literal | ErrorExpression => {
    const left = parseExpression(expr.left, cells, functions);
    const right = parseExpression(expr.right, cells, functions);
    if (!builtInFuncs[expr.operator]) {
        return {
            type: "Error",
            message: `Function ${expr.operator} does not exist.`,
        };
    } else if (isError(left)) {
        return left;
    } else if (isError(right)) {
        return right;
    } else {
        if (expr.operator === "ADD" || expr.operator === "MINUS" || expr.operator === "MULTIPLY" || expr.operator === "DIVIDE") {
            if (typeof left.value !== "number") {
                return {
                    type: "Error",
                    message: `Parameter 1 of ${expr.operator} expects a number value. But ${left.value} is a text and cannot be coerced to a number.`,
                };
            } else if (typeof right.value !== "number") {
                return {
                    type: "Error",
                    message: `Parameter 2 of ${expr.operator} expects a number value. But ${right.value} is a text and cannot be coerced to a number.`,
                };
            } else {
                return {
                    type: "Literal",
                    value: builtInFuncs[expr.operator](left.value, right.value),
                };
            }
        } else if (expr.operator === "CONCAT") {
            return {
                type: "Literal",
                value: builtInFuncs[expr.operator](left.value, right.value),
            };
        } else {
            return {
                type: "Error",
                message: `Operator ${expr.operator} is not defined.`,
            };
        }
    }
};

const parseFunction = (expr: FunctionCall, cells: Record<string, Cell>, functions: Record<string, Function>): Literal | ErrorExpression => {
    const func = functions[expr.name.toUpperCase()];
    if (func) {
        if (func.length !== expr.args.length) {
            return {
                type: "Error",
                message: `Wrong amount of arguments passed to ${expr.name.toUpperCase()}. Expected ${func.length} arguments, but got ${expr.args.length} ${expr.args.length === 1 ? "argument" : "arguments"}.`,
            };
        } else {
            const expressedArgs = expr.args.map(l => parseExpression(l, cells, functions));
            if (TypeGuard<Expression[], Literal[]>(expressedArgs, !expressedArgs.some(isError))) {
                return {
                    type: "Literal",
                    value: func(...expressedArgs.map(l => l.value)),
                };
            } else {
                return expressedArgs.find(isError);
            }
        }
    } else {
        return {
            type: "Error",
            message: `Unknown function "${expr.name}".`,
        };
    }
};

const parseExpression = (expr: Expression, cells: Record<string, Cell>, functions: Record<string, Function>): Literal | ErrorExpression => {
    if (isError(expr)) {
        return expr;
    } else if (isLiteral(expr)) {
        return expr;
    } else if (isFunctionCall(expr)) {
        return parseFunction(expr, cells, functions);
    } else if (isVariable(expr)) {
        return {
            type: "Literal",
            value: cells[expr.value],
        };
    } else if (isBinaryExpression(expr)) {
        return parseBinaryExpression(expr, cells, functions);
    }
};

export { Expression };

const cells = {
    A4: "baasdf",
};
const functions = builtInFuncs;
const stringToParse = 'add(multiply(3, 4), 2 <> 5)';
console.log(`Parsing ${stringToParse}`);
console.log(parseExpression(parser.parse(stringToParse), cells, functions));
