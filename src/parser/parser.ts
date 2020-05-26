import parser from "./lexer";
import { ErrorExpression, Expression, FunctionCall } from "../parser/helpers/expression";
import { builtInFuncs, Func } from "../parser/helpers/builtInFuncs";
import { isFunctionCall } from "../parser/helpers/parser";

const parseFunctionCall = (expr: FunctionCall, functions: Record<string, Func>): Expression | ErrorExpression => {
    const name = expr.name.toUpperCase();
    if (functions[name].apply.length !== expr.args.length) {
        return {
            type: "Error",
            message: `Function ${name} expects ${functions[name].apply.length} arguments, but received ${expr.args.length}.`
        }
    }
    const args = expr.args.map(l => parseExpression(l, functions));
    console.log(args);
    for (const [idx, arg] of args.entries()) {
        if (!functions[name].argTypes.input[idx].includes(arg.type)) {
            return {
                type: "Error",
                message: `Argument ${idx + 1} of function ${name} expects an argument of type ${functions[name].argTypes.input[idx]} but received an argument of type ${arg.type}.`
            }
        }
    }
    return functions[name].apply(...args);
};

const parseExpression = (expr: Expression, functions: Record<string, Func>): Expression => {
    if (isFunctionCall(expr)) {
        return parseFunctionCall(expr, functions);
    } else {
        return expr;
    }
};

const stringToParse = 'add(1, multiply(3, 4))';
console.log(`Parsing ${stringToParse}`);
// @ts-ignore
console.log("Result", parseExpression(parser.parse(stringToParse).body[0], builtInFuncs));
