import { BinaryExpression, ErrorExpression, Expression, Literal, Variable } from "@/parser/helpers/expression";

const isLiteral = (expr: Expression): expr is Literal => expr.type === "Literal";

const isError = (expr: Expression): expr is ErrorExpression => expr.type === "Error";

const isVariable = (expr: Expression): expr is Variable => expr.type === "Variable";

const isBinaryExpression = (expr: Expression): expr is BinaryExpression => expr.type === "BinaryExpression";

export { isLiteral, isError, isVariable, isBinaryExpression };
