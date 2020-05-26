type ExpressionType
    = "Error"
    | "FunctionCall"
    | "BinaryExpression"
    | "ConditionalExpression"
    | "NumberLiteral"
    | "StringLiteral"
    | "BooleanLiteral"
    | "Variable"
    | "CellRange"
    | "Array"

type CellValue = number | string | boolean;

interface Program {
    type: "Program",
    body: Expression[]
}

interface Expression {
    type: ExpressionType
}

interface NumberLiteral extends Expression {
    type: "NumberLiteral",
    value: number
}

interface StringLiteral extends Expression {
    type: "StringLiteral",
    value: string
}

interface BooleanLiteral extends Expression {
    type: "BooleanLiteral",
    value: boolean
}

interface Variable extends Expression {
    type: "Variable",
    value: string
}

interface CellRange extends Expression {
    type: "CellRange",
    start: Variable,
    end: Variable
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
    NumberLiteral,
    BooleanLiteral,
    StringLiteral,
    Variable,
    CellRange,
    BinaryExpression,
    FunctionCall
}
