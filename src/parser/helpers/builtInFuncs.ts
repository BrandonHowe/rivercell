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
            output: ["NumberLiteral"],
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) + Number(b.value)}),
    },
    MINUS: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: ["NumberLiteral"],
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) - Number(b.value)}),
    },
    MULTIPLY: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: ["NumberLiteral"],
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) * Number(b.value)}),
    },
    DIVIDE: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: ["NumberLiteral"],
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) / Number(b.value)}),
    },
    POW: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: ["NumberLiteral"],
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) ** Number(b.value)}),
    },
    MOD: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral"], ["NumberLiteral", "BooleanLiteral"]],
            output: ["NumberLiteral"],
        },
        apply: (a: NumOrBool, b: NumOrBool) => ({type: "NumberLiteral", value: Number(a.value) % Number(b.value)}),
    },
    CONCAT: {
        argTypes: {
            input: [["NumberLiteral", "BooleanLiteral", "StringLiteral"], ["NumberLiteral", "BooleanLiteral", "StringLiteral"]],
            output: ["NumberLiteral", "StringLiteral"],
        },
        apply: (a: NumOrBoolOrString, b: NumOrBoolOrString) => {
            const res = a.value.toString() + b.value.toString();
            if (Number(res)) {
                return {
                    type: "NumberLiteral",
                    value: Number(res),
                };
            } else {
                return {
                    type: "StringLiteral",
                    value: res,
                };
            }
        },
    },
    EQUAL: {
        argTypes: {
            input: [["NumberLiteral", "StringLiteral", "BooleanLiteral"], ["NumberLiteral", "StringLiteral", "BooleanLiteral"]],
            output: ["BooleanLiteral"],
        },
        apply: <T extends NumOrBoolOrString>(a: T, b: T) => ({type: "BooleanLiteral", value: a.value === b.value}),
    },
    GREQUAL: {
        argTypes: {
            input: [["NumberLiteral", "StringLiteral", "BooleanLiteral"], ["NumberLiteral", "StringLiteral", "BooleanLiteral"]],
            output: ["BooleanLiteral"],
        },
        apply: <T extends NumOrBoolOrString>(a: T, b: T) => ({type: "BooleanLiteral", value: a.value >= b.value}),
    },
    GREATER: {
        argTypes: {
            input: [["NumberLiteral", "StringLiteral", "BooleanLiteral"], ["NumberLiteral", "StringLiteral", "BooleanLiteral"]],
            output: ["BooleanLiteral"],
        },
        apply: <T extends NumOrBoolOrString>(a: T, b: T) => ({type: "BooleanLiteral", value: a.value > b.value}),
    },
    LESS: {
        argTypes: {
            input: [["NumberLiteral", "StringLiteral", "BooleanLiteral"], ["NumberLiteral", "StringLiteral", "BooleanLiteral"]],
            output: ["BooleanLiteral"],
        },
        apply: <T extends NumOrBoolOrString>(a: T, b: T) => ({type: "BooleanLiteral", value: a.value < b.value}),
    },
    LEQUAL: {
        argTypes: {
            input: [["NumberLiteral", "StringLiteral", "BooleanLiteral"], ["NumberLiteral", "StringLiteral", "BooleanLiteral"]],
            output: ["BooleanLiteral"],
        },
        apply: <T extends NumOrBoolOrString>(a: T, b: T) => ({type: "BooleanLiteral", value: a.value <= b.value}),
    },
    NOTEQUAL: {
        argTypes: {
            input: [["NumberLiteral", "StringLiteral", "BooleanLiteral"], ["NumberLiteral", "StringLiteral", "BooleanLiteral"]],
            output: ["BooleanLiteral"],
        },
        apply: <T extends NumOrBoolOrString>(a: T, b: T) => ({type: "BooleanLiteral", value: a.value !== b.value}),
    }
};

const builtInInfixes: Record<string, string> = {
    "+": "ADD",
    "-": "MINUS",
    "*": "MULTIPLY",
    "/": "DIVIDE",
    "<>": "CONCAT",
};

export { builtInFuncs, builtInInfixes, Func };
