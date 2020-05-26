import { CellValue } from "@/parser/helpers/expression";

const argMatchesTypes = (arg: FuncArgAllowedType, allowedTypes: FuncArgType[]) => {
    if (allowedTypes.includes("any")) {
        return true;
    } else if (Array.isArray(arg)) {
        return allowedTypes.includes("array");
    } else return ["number", "string", "boolean"].includes(typeof arg);
};

const displayFuncArgTypes = (types: FuncArgType[]) => {
    const stringifiedArr = types.map(l => `${l}, `);
    const slicedArr = stringifiedArr.slice(0, stringifiedArr.length - 1);
    return [...slicedArr, `or ${types[types.length - 1]}`];
};

const typeToArgType = (val: unknown): FuncArgType => {
    if (Array.isArray(val)) {
        return "array";
    } else if (typeof val === "number" ) {
        return "number";
    } else if (typeof val === "string" ) {
        return "string";
    } else if (typeof val === "boolean" ) {
        return "boolean";
    } else return "any";
};

type FuncArgType = "number" | "string" | "boolean" | "array" | "any";
type FuncArgAllowedType = number | string | boolean | unknown[] | any;

interface Func {
    argTypes: FuncArgType[][],
    apply: (...args: FuncArgAllowedType) => unknown
}

const builtInFuncs: Record<string, Func> = {
    ADD: {
        argTypes: [["number", "boolean"], ["number", "boolean"]],
        apply: (a: number | boolean, b: number | boolean) => Number(a) + Number(b),
    },
    MINUS: {
        argTypes: [["number", "boolean"], ["number", "boolean"]],
        apply: (a: number | boolean, b: number | boolean) => Number(a) - Number(b),
    },
    MULTIPLY: {
        argTypes: [["number", "boolean"], ["number", "boolean"]],
        apply: (a: number | boolean, b: number | boolean) => Number(a) * Number(b),
    },
    DIVIDE: {
        argTypes: [["number", "boolean"], ["number", "boolean"]],
        apply: (a: number | boolean, b: number | boolean) => Number(a) / Number(b),
    },
    POW: {
        argTypes: [["number", "boolean"], ["number", "boolean"]],
        apply: (a: number | boolean, b: number | boolean) => Number(a) ** Number(b),
    },
    MOD: {
        argTypes: [["number", "boolean"], ["number", "boolean"]],
        apply: (a: number | boolean, b: number | boolean) => Number(a) % Number(b),
    },
    CONCAT: {
        argTypes: [["number", "boolean", "string", "array"], ["number", "boolean", "string", "array"]],
        apply: <T extends CellValue | unknown[]>(a: T, b: T) => {
            if (!Array.isArray(a) && !Array.isArray(b)) {
                const rawSum = a.toString() + b.toString();
                return Number(rawSum) ? Number(rawSum) : rawSum;
            } else if (Array.isArray(a) && Array.isArray(b)) {
                return [...a, ...b];
            }
        },
    },
    EQUAL: {
        argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
        apply: (a: CellValue, b: CellValue) => a === b
    },
    GREQUAL: {
        argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
        apply: (a: CellValue, b: CellValue) => a >= b
    },
    GREATER: {
        argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
        apply: (a: CellValue, b: CellValue) => a > b
    },
    LESS: {
        argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
        apply: (a: CellValue, b: CellValue) => a < b
    },
    LEQUAL: {
        argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
        apply: (a: CellValue, b: CellValue) => a <= b
    },
    NOTEQUAL: {
        argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"]],
        apply: (a: CellValue, b: CellValue) => a !== b
    },
    IF: {
        argTypes: [["number", "string", "boolean"], ["number", "string", "boolean"], ["number", "string", "boolean"]],
        apply: (a: CellValue, b: CellValue, c: CellValue) => a ? b : c
    }
};

export { argMatchesTypes, displayFuncArgTypes, typeToArgType, builtInFuncs, Func };
