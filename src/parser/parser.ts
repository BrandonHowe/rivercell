import { isBinaryExpression, isError, isLiteral, isVariable } from "./helpers/parser";
import { Expression, BinaryExpression, Literal, ErrorExpression } from "./helpers/expression";
import { builtInFuncs } from "./helpers/builtInFuncs";
import parser from "./lexer";

type Cell = number | string;

const parseBinaryExpression = (expr: BinaryExpression, cells: Record<string, Cell>): Literal | ErrorExpression => {
    const left = parseExpression(expr.left, cells);
    const right = parseExpression(expr.right, cells);
    if (!builtInFuncs[expr.operator]) {
        return {
            type: "Error",
            message: `Function ${expr.operator} does not exist.`
        }
    } else if (isError(left)) {
        return left;
    } else if (isError(right)) {
        return right;
    } else {
        if (expr.operator === "+" || expr.operator === "-" || expr.operator === "*" || expr.operator === "/") {
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
                    value: builtInFuncs[expr.operator](left.value, right.value)
                };
            }
        } else if (expr.operator === "<>") {
            return {
                type: "Literal",
                value: builtInFuncs[expr.operator](left.value, right.value)
            };
        } else {
            return {
                type: "Error",
                message: `Operator ${expr.operator} is not defined.`
            }
        }
    }
};

const parseExpression = (expr: Expression, cells: Record<string, Cell>): Literal | ErrorExpression => {
    if (isLiteral(expr)) {
        return expr;
    }
    if (isError(expr)) {
        return expr;
    }
    if (isVariable(expr)) {
        return {
            type: "Literal",
            value: cells[expr.value]
        }
    }
    if (isBinaryExpression(expr)) {
        return parseBinaryExpression(expr, cells);
    }
};

export { Expression };

const cells = {
    A4: "baasdf"
};
const stringToParse = '"hello" <> "world"';
console.log(`Parsing ${stringToParse}`);
console.log(parseExpression(parser.parse(stringToParse), cells));
