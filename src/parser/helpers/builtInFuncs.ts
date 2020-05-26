import { BooleanLiteral, ExpressionType, NumberLiteral, StringLiteral } from "@/parser/helpers/expression";

type FuncArgType = ExpressionType;
type FuncArgAllowedType = NumberLiteral | StringLiteral | BooleanLiteral | unknown[] | any;

interface Func {
    argTypes: FuncTyping,
    apply: (...args: FuncArgAllowedType) => FuncArgAllowedType
}

interface FuncTyping {
    input: FuncArgType[][],
    output: FuncArgType
}

type NumOrBool = NumberLiteral | BooleanLiteral;

const builtInFuncs: Record<string, Func> = {
    ADD: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: "NumberLiteral"
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) + Number(b.value)}),
    },
    MINUS: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: "NumberLiteral"
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) - Number(b.value)}),
    },
    MULTIPLY: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: "NumberLiteral"
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) * Number(b.value)}),
    },
    DIVIDE: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: "NumberLiteral"
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
    // CONCAT: {
    //     argTypes: [["number", "boolean", "string", "array"], ["number", "boolean", "string", "array"]],
    //     apply: <T extends CellValue | unknown[]>(a: T, b: T) => {
    //         if (!Array.isArray(a) && !Array.isArray(b)) {
    //             const rawSum = a.toString() + b.toString();
    //             return Number(rawSum) ? Number(rawSum) : rawSum;
    //         } else if (Array.isArray(a) && Array.isArray(b)) {
    //             return [...a, ...b];
    //         }
    //     },
    // },
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

export { builtInFuncs, Func };
