import Node from './node'

export default class Path extends Node{
	public element: SVGPathElement;
	public length: string;
	public visible: boolean = true;

	constructor(path: SVGPathElement) {
		super(path)
		this.element = path;
		this.length = this.getLength();
	}

}
