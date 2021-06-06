export default class TType {
    name: string; // название типа
    regex: string; // регулярное вырвжение, по которому будет определяться тип


    constructor(name: string, regex: string) {
        this.name = name;
        this.regex = regex;
    }
}

export const tokenTypesList = {
    'NUM': new TType('NUM', '[0-9]*'),
    'VAR': new TType('VAR', '[a-z]*'),
    'EOL': new TType('EOL', ';'), // символ конца строки
    'CAR': new TType('CAR', '\\n'), // carryover - перенос
    'EQUALS': new TType('EQUALS', '='),
    'PLUS': new TType('PLUS', '+'),
    'MINUS': new TType('MINUS', '-'),
    'MULTI': new TType('MULTI', '*'), // multiplication - умножение
    'DIV': new TType('DIV', '/'), // division - деление
    'RB': new TType('RB', '\\)'), // right bracket - правая скобка
    'LB': new TType('LB', '\\('), // left bracket - левая скобка
    'IF': new TType('IF', 'if'),
    'ELSE': new TType('ELSE', 'else'),
    'WHILE': new TType('WHILE', 'while'),
    'LOG': new TType('LOG', 'log') // вывод на консоль
}