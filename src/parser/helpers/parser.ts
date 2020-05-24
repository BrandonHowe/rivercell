import {
    BinaryExpression,
    ErrorExpression,
    Expression,
    FunctionCall,
    Literal,
    Variable,
} from "@/parser/helpers/expression";

const TypeGuard = <T, U extends T>(val: T, result: boolean): val is U => result;

const isLiteral = (expr: Expression): expr is Literal => expr.type === "Literal";

const isError = (expr: Expression): expr is ErrorExpression => expr.type === "Error";

const isVariable = (expr: Expression): expr is Variable => expr.type === "Variable";

const isBinaryExpression = (expr: Expression): expr is BinaryExpression => expr.type === "BinaryExpression";

const isFunctionCall = (expr: Expression): expr is FunctionCall => expr.type === "FunctionCall";

export { TypeGuard, isLiteral, isError, isVariable, isBinaryExpression, isFunctionCall };
