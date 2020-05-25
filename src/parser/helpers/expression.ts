type ExpressionType
    = "Error"
    | "FunctionCall"
    | "BinaryExpression"
    | "TernaryExpression"
    | "Literal"
    | "Variable"

interface Program {
    type: "Program",
    body: Expression[]
}

interface Expression {
    type: ExpressionType
}

interface Literal extends Expression {
    type: "Literal",
    value: number | string
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

interface FunctionCall extends Expression {
    type: "FunctionCall",
    name: string,
    args: Expression[]
}

export {
    Program,
    ExpressionType,
    Expression,
    ErrorExpression,
    Literal,
    Variable,
    BinaryExpression,
    FunctionCall
}
