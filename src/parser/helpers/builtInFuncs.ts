import { BooleanLiteral, Expression, ExpressionType, NumberLiteral, StringLiteral } from "@/parser/helpers/expression";

type FuncArgType = ExpressionType;
type FuncArgAllowedType = NumberLiteral | StringLiteral | BooleanLiteral | unknown[] | any;

interface Func {
    argTypes: FuncTyping,
    apply: (...args: FuncArgAllowedType) => Expression
}

interface FuncTyping {
    input: FuncArgType[][],
    output: FuncArgType[]
}

type NumOrBool = NumberLiteral | BooleanLiteral;
type NumOrBoolOrString = NumberLiteral | BooleanLiteral | StringLiteral;

const builtInFuncs: Record<string, Func> = {
    ADD: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: ["NumberLiteral"]
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) + Number(b.value)}),
    },
    MINUS: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: ["NumberLiteral"]
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) - Number(b.value)}),
    },
    MULTIPLY: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: ["NumberLiteral"]
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) * Number(b.value)}),
    },
    DIVIDE: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: ["NumberLiteral"]
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) / Number(b.value)}),
    },
    // POW: {
    //     argTypes: [["number", "boolean"], ["number", "boolean"]],
    //     apply: (a: NumOrBool, b: NumOrBool) => Number(a) ** Number(b),
    // },
    // MOD: {
    //     argTypes: [["number", "boolean"], ["number", "boolean"]],
    //     apply: (a: NumOrBool, b: NumOrBool) => Number(a) % Number(b),
    // },
    CONCAT: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral", "StringLiteral"], ["NumberLiteral", "BooleanLiteral", "StringLiteral"]],
            output: ["NumberLiteral", "StringLiteral"]
        },
        apply: (a: NumOrBoolOrString, b: NumOrBoolOrString) => {
            const res = a.value.toString() + b.value.toString();
            if (Number(res)) {
                return {
                    type: "NumberLiteral",
                    value: Number(res)
                }
            } else {
                return {
                    type: "StringLiteral",
                    value: res
                }
            }
        },
    },
    // EQUAL: {
    //     argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
    //     apply: (a: CellValue, b: CellValue) => a === b
    // },
    // GREQUAL: {
    //     argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
    //     apply: (a: CellValue, b: CellValue) => a >= b
    // },
    // GREATER: {
    //     argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
    //     apply: (a: CellValue, b: CellValue) => a > b
    // },
    // LESS: {
    //     argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
    //     apply: (a: CellValue, b: CellValue) => a < b
    // },
    // LEQUAL: {
    //     argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
    //     apply: (a: CellValue, b: CellValue) => a <= b
    // },
    // NOTEQUAL: {
    //     argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
    //     apply: (a: CellValue, b: CellValue) => a !== b
    // },
    // IF: {
    //     argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"], ["number", "string", "boolean"]],
    //     apply: (a: CellValue, b: CellValue, c: CellValue) => a ? b : c
    // }
};

const infixes: Record<string, string> = {
    "+": "ADD",
    "-": "MINUS",
    "*": "MULTIPLY",
    "/": "DIVIDE",
    "<>": "CONCAT"
};

export { builtInFuncs, infixes, Func };
