import ExpressionNode from "./ExpressionNode";

export default class StatementsNode extends ExpressionNode {     // корневой узел дерева, хранящий строки кода
    codeStrings: ExpressionNode[] = [];

    addNode(node: ExpressionNode) {
        this.codeStrings.push(node);
    }
}