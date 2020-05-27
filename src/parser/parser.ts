import parser from "./lexer";
import { ErrorExpression, Expression, FunctionCall, InfixExpression } from "../parser/helpers/expression";
import { builtInFuncs, Func, infixes } from "../parser/helpers/builtInFuncs";
import { isFunctionCall, TypeGuard } from "../parser/helpers/parser";

const parseInfix = (expr: InfixExpression, functions: Record<string, Func>, infixes: Record<string, string>): Expression | ErrorExpression => {
    const infixFunc = functions[infixes[expr.operator].toUpperCase()];
    if (infixFunc) {
        return parseFunctionCall({
            type: "FunctionCall",
            name: infixes[expr.operator].toUpperCase(),
            args: expr.args
        }, functions, infixes);
    } else {
        return {
            type: "Error",
            message: `Infix operator ${expr.operator} is not defined.`
        }
    }
};

const parseFunctionCall = (expr: FunctionCall, functions: Record<string, Func>, infixes: Record<string, string>): Expression | ErrorExpression => {
    console.log("Parsing", expr);
    const name = expr.name.toUpperCase();
    if (functions[name].apply.length !== expr.args.length) {
        return {
            type: "Error",
            message: `Function ${name} expects ${functions[name].apply.length} arguments, but received ${expr.args.length}.`
        }
    }
    const args = expr.args.map(l => parseExpression(l, functions, infixes));
    console.log(args);
    for (const [idx, arg] of args.entries()) {
        if (arg.type === "Error") {
            return arg;
        }
        if (!functions[name].argTypes.input[idx].includes(arg.type)) {
            return {
                type: "Error",
                message: `Argument ${idx + 1} of function ${name} expects an argument of type ${functions[name].argTypes.input[idx]} but received an argument of type ${arg.type}.`
            }
        }
    }
    return functions[name].apply(...args);
};

const parseExpression = (expr: Expression, functions: Record<string, Func>, infixes: Record<string, string>): Expression => {
    if (isFunctionCall(expr)) {
        return parseFunctionCall(expr, functions, infixes);
    } else if (TypeGuard<Expression, InfixExpression>(expr, expr.type === "InfixExpression")) {
        return parseInfix(expr, functions, infixes);
    } else {
        return expr;
    }
};

const stringToParse = '5 + 9 <> 2';
console.log(`Parsing ${stringToParse}`);
// @ts-ignore
console.log("Result", parseExpression(parser.parse(stringToParse).body[0], builtInFuncs, infixes));
