import Node from './node'

export default class Ellipse extends Node{
	public element: SVGEllipseElement;
	public length: string;
	public visible: boolean = true;

	constructor(ellipse: SVGEllipseElement) {
		super(ellipse)
		this.element = ellipse;
		this.length = this.getLength();
	}

}
