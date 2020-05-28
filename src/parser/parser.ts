import parser from "./lexer";
import {
    ErrorExpression,
    Expression,
    FunctionCall,
    InfixExpression, NumberLiteral,
    Program,
    Variable,
} from "../parser/helpers/expression";
import { builtInFuncs, builtInInfixes, Func } from "../parser/helpers/builtInFuncs";
import { isFunctionCall, TypeGuard } from "../parser/helpers/parser";

class ProgramEvaluator {
    constructor (private program: Program, private variables: Record<string, Expression>, private functions: Record<string, Func>, private infixes: Record<string, string>) {}

    private parseInfix (expr: InfixExpression): Expression | ErrorExpression {
        const infixFunc = this.functions[this.infixes[expr.operator].toUpperCase()];
        if (infixFunc) {
            return this.parseFunctionCall({
                type: "FunctionCall",
                name: this.infixes[expr.operator].toUpperCase(),
                args: expr.args,
            });
        } else {
            return {
                type: "Error",
                message: `Infix operator ${expr.operator} is not defined.`,
            };
        }
    }

    private parseVariable (expr: Variable): Expression | ErrorExpression {
        if (this.variables[expr.value]) {
            return this.parseExpression(this.variables[expr.value]);
        } else {
            return {
                type: "Error",
                message: `${expr.value} is not defined.`
            }
        }
    }

    private parseFunctionCall (expr: FunctionCall): Expression | ErrorExpression {
        const name = expr.name.toUpperCase();
        if (this.functions[name].apply.length !== expr.args.length) {
            return {
                type: "Error",
                message: `Function ${name} expects ${this.functions[name].apply.length} arguments, but received ${expr.args.length}.`,
            };
        }
        const args = expr.args.map(l => this.parseExpression(l));
        for (const [idx, arg] of args.entries()) {
            if (arg.type === "Error") {
                return arg;
            }
            if (!this.functions[name].argTypes.input[idx].includes(arg.type)) {
                return {
                    type: "Error",
                    message: `Argument ${idx + 1} of function ${name} expects an argument of type ${this.functions[name].argTypes.input[idx]} but received an argument of type ${arg.type}.`,
                };
            }
        }
        return this.functions[name].apply(...args);
    };

    private parseExpression (expr: Expression): Expression {
        if (isFunctionCall(expr)) {
            return this.parseFunctionCall(expr);
        } else if (TypeGuard<Expression, InfixExpression>(expr, expr.type === "InfixExpression")) {
            return this.parseInfix(expr);
        } else if (TypeGuard<Expression, Variable>(expr, expr.type === "Variable")) {
            return this.parseVariable(expr);
        } else {
            return expr;
        }
    };

    get programResult () {
        return this.parseExpression(this.program.body[this.program.body.length - 1]);
    }
}

const stringToParse = 'add(1, C4)';
console.log(`Parsing ${stringToParse}`);
console.log("Result", new ProgramEvaluator(<Program>parser.parse(stringToParse), {"C4": <NumberLiteral>{type: "NumberLiteral", value: 5}}, builtInFuncs, builtInInfixes).programResult);
