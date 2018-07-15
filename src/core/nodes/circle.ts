import Node from './node'

export default class Circle extends Node{
	public element: SVGCircleElement;
	public length: string;
	public visible: boolean = true;

	constructor(circle: SVGCircleElement) {
		super(circle)
		this.element = circle;
		this.length = this.getLength();
	}

}
