import Token from "./Token"
import {tokenTypesList} from "./TType";

export default class Lexer{
    code: string;
    pos: number = 0;
    tokenList: Token[] = []


    constructor(code: string) {
        this.code = code;
    }

    lex(): Token[] {   // лексический анализ
        while (this.nextToken()) {
            console.log ('token')
        }
        this.tokenList = this.tokenList.filter(token => token.type.name !== tokenTypesList.CAR.name);  // убираем пробелы между токенами
        return this.tokenList
    }

    nextToken(): boolean {   // перебираем токены
        if (this.pos >= this.code.length) {  //если текущая позиция больше чем длина кода, то цикл завершается
            return false;
        }
        const tokenTypesValues = Object.values(tokenTypesList)   // список типов токенов
        for (let i = 0; i < tokenTypesValues.length; i++) {
            const tokenType = tokenTypesValues[i];
            const regex = new RegExp('^' + tokenType.regex);  // ищем тот тип токена, который совпадает с началом строки кода
            const result = this.code.substr(this.pos).match(regex);
            if(result && result[0]) {
                const token = new Token(tokenType, result[0], this.pos);
                this.pos += result[0].length;
                this.tokenList.push(token);
                return true;
            }
        }
        throw new Error(`Error ${this.pos}`)  // на данной позиции обнаружена ошибка
    }

}