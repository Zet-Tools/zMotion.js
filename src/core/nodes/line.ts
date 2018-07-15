import Node from './node'

export default class Line extends Node{
	public element: SVGLineElement;
	public length: string;
	public visible: boolean = true;

	constructor(line: SVGLineElement) {
		super(line)
		this.element = line;
		this.length = this.getLength();
	}
}
