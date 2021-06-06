"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lexer_1 = __importDefault(require("./Lexer"));
var code = 'код EQUALS 5 PLUS 9 PLUS (4 MINUS 6); LOG код;';
var lexer = new Lexer_1.default(code);
lexer.lex();
console.log(lexer.tokenList);
