import { SvgHelper } from '../helpers/svgHelper'

type SVGElement = SVGPathElement|SVGGElement|SVGLineElement|SVGRectElement|SVGPolygonElement|SVGCircleElement|SVGEllipseElement;

export default class Node {
	public element: SVGElement;
	public length: string;
	public visible: boolean = true;

	constructor(path: SVGElement) {
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

	protected getLength(): string {
		if (this.element instanceof SVGPathElement) {
			return SvgHelper.getPathLength(this.element).toString();
		} else if (this.element instanceof SVGLineElement) {
			return SvgHelper.getLineLength(this.element).toString();
		} else if (this.element instanceof SVGPolygonElement) {
			return SvgHelper.getPolygonLength(this.element, false).toString();
		} else if (this.element instanceof SVGRectElement) {
			return SvgHelper.getRectLength(this.element).toString();
		} else if (this.element instanceof SVGCircleElement) {
			return SvgHelper.getCircleLength(this.element).toString();
		} else if (this.element instanceof SVGPolylineElement) {
			return SvgHelper.getPolygonLength(this.element, true).toString();
		} else if (this.element instanceof SVGEllipseElement) {
			return SvgHelper.getEllipseLength(this.element).toString();
		}

		return "0";
	}
  
}