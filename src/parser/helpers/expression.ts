type ExpressionType
    = "Error"
    | "FunctionCall"
    | "BinaryExpression"
    | "ConditionalExpression"
    | "Literal"
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

interface Literal extends Expression {
    type: "Literal",
    value: CellValue
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

interface ArrayExpression extends Expression {
    type: "Array",
    values: Expression[]
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

interface ConditionalExpression extends Expression {
    type: "ConditionalExpression",
    condition: BinaryExpression,
    success: Expression,
    failure: Expression
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
    ArrayExpression,
    Literal,
    Variable,
    CellRange,
    BinaryExpression,
    ConditionalExpression,
    FunctionCall
}
