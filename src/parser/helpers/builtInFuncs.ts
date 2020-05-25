import { CellValue } from "@/parser/helpers/expression";

const builtInFuncs = {
    ADD: (a: number | boolean, b: number | boolean) => Number(a) + Number(b),
    MINUS: (a: number | boolean, b: number | boolean) => Number(a) - Number(b),
    MULTIPLY: (a: number | boolean, b: number | boolean) => Number(a) * Number(b),
    DIVIDE: (a: number | boolean, b: number | boolean) => Number(a) / Number(b),
    POW: (a: number | boolean, b: number | boolean) => Number(a) ** Number(b),
    MOD: (a: number | boolean, b: number | boolean) => Number(a) % Number(b),
    CONCAT: (a: CellValue, b: CellValue) => {
        const rawSum = a.toString() + b.toString();
        return Number(rawSum) ? Number(rawSum) : rawSum;
    },
    EQUAL: (a: CellValue, b: CellValue) => a === b,
    GREQUAL: (a: CellValue, b: CellValue) => a >= b,
    GREATER: (a: CellValue, b: CellValue) => a > b,
    LESS: (a: CellValue, b: CellValue) => a < b,
    LEQUAL: (a: CellValue, b: CellValue) => a <= b,
    NOTEQUAL: (a: CellValue, b: CellValue) => a !== b
};

export { builtInFuncs }
