import TType from "./TType";

export default class Token {
    type: TType; //тип токена, переменная или число
    text: string; //либо число, либо название переменной либо оператор
    pos: number; //номер позиции в коде


    constructor(type: TType, text: string, pos: number) {
        this.type = type;
        this.text = text;
        this.pos = pos;
    }
}

