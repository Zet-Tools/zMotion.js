import Node from './node'

export default class Polygon extends Node{
	public element: SVGPolygonElement;
	public length: string;
	public visible: boolean = true;

	constructor(polygon: SVGPolygonElement) {
        super(polygon)
		this.element = polygon;
		this.length = this.getLength();
	}


}
