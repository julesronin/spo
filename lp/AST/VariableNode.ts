import ExpressionNode from "./ExpressionNode";
import Token from "../Token";

export default class VariableNode extends ExpressionNode {  // узел для переменной
    variable: Token;


    constructor(variable: Token) {
        super();
        this.variable = variable;
    }
}