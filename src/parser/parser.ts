import { isBinaryExpression, isError, isFunctionCall, isLiteral, isVariable, TypeGuard } from "./helpers/parser";
import { CellValue, Expression, BinaryExpression, Literal, ErrorExpression, FunctionCall, Program } from "./helpers/expression";
import { builtInFuncs } from "./helpers/builtInFuncs";
import parser from "./lexer";

const parseBinaryExpression = (expr: BinaryExpression, cells: Record<string, CellValue>, functions: Record<string, Function>): Literal | ErrorExpression => {
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
        if (["ADD", "MINUS", "MULTIPLY", "DIVIDE"].includes(expr.operator)) {
            if (typeof left.value === "string") {
                return {
                    type: "Error",
                    message: `Parameter 1 of ${expr.operator} expects a number value. But ${left.value} is a text and cannot be coerced to a number.`,
                };
            } else if (typeof right.value === "string") {
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
        } else if (["CONCAT", "EQUAL", "GREQUAL", "GREATER", "LESS", "LEQUAL", "NOTEQUAL"]) {
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

const parseFunction = (expr: FunctionCall, cells: Record<string, CellValue>, functions: Record<string, Function>): Literal | ErrorExpression => {
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

const parseExpression = (expr: Expression, cells: Record<string, CellValue>, functions: Record<string, Function>): Literal | ErrorExpression => {
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

const parseProgram = (program: Program, cells: Record<string, CellValue>, functions: Record<string, Function>): Literal | ErrorExpression => {
    const results = [];
    for (const expr of program.body) {
        const evaluated = parseExpression(expr, cells, functions);
        if (isError(evaluated)) {
            return evaluated;
        } else {
            results.push(evaluated);
        }
    }
    return results[results.length - 1];
};

export { Expression };

const cells = {
    A4: "baasdf",
};
const functions = builtInFuncs;
const stringToParse = '8 % 3';
console.log(`Parsing ${stringToParse}`);
// @ts-ignore
console.log(parseProgram(parser.parse(stringToParse), cells, functions));
