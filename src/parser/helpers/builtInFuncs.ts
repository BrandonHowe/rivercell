const builtInFuncs = {
    ADD: (a: number, b: number) => a + b,
    MINUS: (a: number, b: number) => a - b,
    MULTIPLY: (a: number, b: number) => a * b,
    DIVIDE: (a: number, b: number) => a / b,
    CONCAT: (a: number | string, b: number | string) => a.toString() + b.toString()
};

export { builtInFuncs }
