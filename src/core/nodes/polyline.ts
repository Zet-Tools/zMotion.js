import Node from './node'

export default class Polyline extends Node{
	public element: SVGPolylineElement;
	public length: string;
	public visible: boolean = true;

	constructor(polyline: SVGPolylineElement) {
		super(polyline)
		this.element = polyline;
		this.length = this.getLength();
	}

}
