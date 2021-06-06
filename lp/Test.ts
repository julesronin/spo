import Lexer from "./Lexer";
import Parser from "./Parser";

const code =
    'EQUALS 7 PLUS 1 MULTI (4 MINUS 6); ' +
    'LOG;'

const lexer =new Lexer(code);

lexer.lex()

const parser = new Parser(lexer.tokenList);

const rootNode = parser.parseCode()

parser.run(rootNode);