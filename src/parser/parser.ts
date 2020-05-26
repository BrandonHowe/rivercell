import parser from "./lexer";

const stringToParse = 'C4:D6';
console.log(`Parsing ${stringToParse}`);
// @ts-ignore
console.log("Result", parseProgram(parser.parse(stringToParse)));
