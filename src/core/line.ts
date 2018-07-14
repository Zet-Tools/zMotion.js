import { SvgHelper } from "./svgHelper";

export default class Line {
	public element: SVGLineElement;
	public length: string;
	public visible: boolean = true;

	constructor(path: SVGLineElement) {
		this.element = path;
		this.length = this.getLength();
	}	

	public drawPath() {
		this.element.style.strokeDashoffset = "0";
		this.visible = true;
	}

	public clearPath() {
		this.element.style.strokeDashoffset = this.length;
		this.element.style.strokeDasharray = this.length;
		this.visible = false;
	}

	private getLength(): string {
		return SvgHelper.getLineLength(this.element).toString();
	}

}
