type ExpressionType
    = "Error"
    | "FunctionCall"
    | "BinaryExpression"
    | "TernaryExpression"
    | "Literal"
    | "Variable"

type CellValue = number | string | boolean;

interface Program {
    type: "Program",
    body: Expression[]
}

interface Expression {
    type: ExpressionType
}

interface Literal extends Expression {
    type: "Literal",
    value: CellValue
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
    CellValue,
    ExpressionType,
    Expression,
    ErrorExpression,
    Literal,
    Variable,
    BinaryExpression,
    FunctionCall
}
