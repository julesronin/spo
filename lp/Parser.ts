import Token from "./Token";
import TokenType, {tokenTypesList} from "./TType";
import ExpressionNode from "./AST/ExpressionNode";
import StatementsNode from "./AST/StatementsNode";
import NumberNode from "./AST/NumberNode";
import VariableNode from "./AST/VariableNode";
import BinOperationNode from "./AST/BinOperationNode";
import UnarOperationNode from "./AST/UnarOperationNode";

export default class Parser{
    tokens: Token[];
    pos: number = 0;
    scope: any = {};  // сохраняем название переменной, а как значение, сохраняем то, чему эта переменная равна


    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    match(...expected: TokenType[]): Token | null {   // возвращает токен из списка
        if (this.pos < this.tokens.length) {
            const currentToken = this.tokens[this.pos];
            if (expected.find(type => type.name === currentToken.type.name)) {
                this.pos += 1;
                return currentToken;
            }
        }
        return null;
    }

    require(...expected: TokenType[]): Token {   // ищем ожидаемый токен
        const token = this.match(...expected);
        if (!token) {
            throw new Error(`Error ${this.pos} might be ${expected[0].name}`)
        }
        return token;
    }

    parseVariableOrNumber(): ExpressionNode {
        const number = this.match(tokenTypesList.NUM);
        if (number != null) {
            return new NumberNode(number);
        }
        const variable = this.match(tokenTypesList.VAR);
        if (variable != null) {
            return new VariableNode(variable);
        }
        throw new Error(`Error ${this.pos}`)
    }

    parsePrint(): ExpressionNode {
        const operatorLog = this.match(tokenTypesList.LOG);
        if (operatorLog != null) {
            return new UnarOperationNode(operatorLog, this.parseFormula())
        }
        throw new Error(`Error`)
    }

    parseParentheses(): ExpressionNode {     // функция для скобок
        if (this.match(tokenTypesList.LB) != null) {
            const node = this.parseFormula();
            this.require(tokenTypesList.RB);
            return node;
        } else {
            return this.parseVariableOrNumber();
        }
    }

    parseFormula(): ExpressionNode {
        let leftNode = this.parseParentheses();
        let operator = this.match(tokenTypesList.MINUS, tokenTypesList.PLUS, tokenTypesList.MULTI, tokenTypesList.DIV);
        while (operator != null) {
            const rightNode = this.parseParentheses();
            leftNode = new BinOperationNode(operator, leftNode, rightNode);   // передаем левую ноду пока мы ее не перезаписали; в цикле происходит рекурсивно
            operator = this.match(tokenTypesList.MINUS, tokenTypesList.PLUS, tokenTypesList.MULTI, tokenTypesList.DIV);
        }
        return leftNode;
    }

    parseExpression(): ExpressionNode {
        if (this.match(tokenTypesList.VAR) == null) {
            const printNode = this.parsePrint()
            return printNode;
        }
        this.pos -= 1;
        let variableNode = this.parseVariableOrNumber();
        const assignOperator = this.match(tokenTypesList.EQUALS);
        if (assignOperator != null) {
            const rightFormulaNode = this.parseFormula();
            const binaryNode = new BinOperationNode(assignOperator, variableNode, rightFormulaNode);
            return binaryNode;
        }
        throw new Error(`Error`);
    }

    parseCode(): ExpressionNode {
        const root = new StatementsNode();
        while (this.pos < this.tokens.length) {
            const codeStringNode = this.parseExpression();
            this.require(tokenTypesList.EOL);
            root.addNode(codeStringNode);
        }
        return root;
    }

    run(node: ExpressionNode): any {
        if (node instanceof NumberNode) {
            return parseInt(node.number.text);
        }
        if (node instanceof UnarOperationNode) {
            switch (node.operator.type.name) {
                case tokenTypesList.LOG.name:
                    console.log(this.run(node.operand))
                    return;
            }
        }
        if (node instanceof BinOperationNode) {
            switch (node.operator.type.name) {
                case tokenTypesList.PLUS.name:
                    return this.run(node.leftNode) + this.run(node.rightNode)
                case tokenTypesList.MINUS.name:
                    return this.run(node.leftNode) - this.run(node.rightNode)
                case tokenTypesList.MULTI.name:
                    return this.run(node.leftNode) * this.run(node.rightNode)
                case tokenTypesList.DIV.name:
                    return this.run(node.leftNode) / this.run(node.rightNode)
                case tokenTypesList.EQUALS.name:
                    const result = this.run(node.rightNode)
                    const variableNode = <VariableNode>node.leftNode;
                    this.scope[variableNode.variable.text] = result;
                    return result;
            }
        }
        if (node instanceof VariableNode) {
            if (this.scope[node.variable.text]) {
                return this.scope[node.variable.text]
            } else {
                throw new Error(`Var ${node.variable.text} can't find`)
            }
        }
        if (node instanceof StatementsNode) {
            node.codeStrings.forEach(codeString => {
                this.run(codeString);
            })
            return;
        }
        throw new Error('Error')
    }
}


