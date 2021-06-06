"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = __importDefault(require("./Token"));
var TType_1 = require("./TType");
var Lexer = /** @class */ (function () {
    function Lexer(code) {
        this.pos = 0;
        this.tokenList = [];
        this.code = code;
    }
    Lexer.prototype.lex = function () {
        while (this.nextToken()) {
            console.log('token');
        }
        return this.tokenList;
    };
    Lexer.prototype.nextToken = function () {
        if (this.pos >= this.code.length) { //если текущая позиция больше чем длина кода, то цикл завершается
            return false;
        }
        var tokenTypesValues = Object.values(TType_1.tokenTypesList); // список типов токенов
        for (var i = 0; i < tokenTypesValues.length; i++) {
            var tokenType = tokenTypesValues[i];
            var regex = new RegExp('^' + tokenType.regex); // ищем тот тип токена, который совпадает с началом строки кода
            var result = this.code.substr(this.pos).match(regex);
            if (result && result[0]) {
                var token = new Token_1.default(tokenType, result[0], this.pos);
                this.pos += result[0].length;
                this.tokenList.push(token);
                return true;
            }
        }
        throw new Error("Error " + this.pos); // на данной позиции обнаружена ошибка
    };
    return Lexer;
}());
exports.default = Lexer;
