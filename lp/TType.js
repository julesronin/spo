"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenTypesList = void 0;
var TType = /** @class */ (function () {
    function TType(name, regex) {
        this.name = name;
        this.regex = regex;
    }
    return TType;
}());
exports.default = TType;
exports.tokenTypesList = {
    'NUM': new TType('NUM', '[0-9]*'),
    'VAR': new TType('VAR', '[a-z]*'),
    'EOL': new TType('EOL', ';'),
    'CAR': new TType('CAR', '\\n'),
    'EQUALS': new TType('EQUALS', '='),
    'PLUS': new TType('PLUS', '+'),
    'MINUS': new TType('MINUS', '-'),
    'MULTI': new TType('MULTI', '*'),
    'DIV': new TType('DIV', '/'),
    'RB': new TType('RB', '\\)'),
    'LB': new TType('LB', '\\('),
    'IF': new TType('IF', 'if'),
    'ELSE': new TType('ELSE', 'else'),
    'WHILE': new TType('WHILE', 'while'),
    'LOG': new TType('LOG', 'log') // вывод на консоль
};
