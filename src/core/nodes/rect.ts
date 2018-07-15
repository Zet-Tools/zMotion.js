import Node from './node'

export default class Rect extends Node{
	public element: SVGRectElement;
	public length: string;
	public visible: boolean = true;

	constructor(rect: SVGRectElement) {
		super(rect)
		this.element = rect;
		this.length = this.getLength();
	}

}
