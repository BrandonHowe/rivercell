type ExpressionType
    = "Error"
    | "BinaryExpression"
    | "TernaryExpression"
    | "Literal"
    | "Variable"

interface Expression {
    type: ExpressionType
}

interface Literal extends Expression {
    type: "Literal",
    value: unknown
}

interface Variable extends Expression {
    type: "Variable",
    value: string
}

interface ErrorExpression extends Expression {
    type: "Error"
    message: string
}

interface BinaryExpression extends Expression {
    type: "BinaryExpression",
    operator: string,
    left: Expression,
    right: Expression
}

export {
    ExpressionType,
    Expression,
    ErrorExpression,
    Literal,
    Variable,
    BinaryExpression
}
