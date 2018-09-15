import { SvgHelper } from '../helpers/svgHelper'

export default class Node {
	public element: SVGGElement;
	public length: string;
	public visible: boolean = true;
	private elementData: any = {
		fill: 'black',
		fillOpacity: '1'
	}

	constructor (path: SVGGElement) {
		this.element = path;
		this.length = this.getLength();
		this.collectElementData();
	}	

	public drawStroke (): void {
		this.element.style.strokeDashoffset = "0";
	}

	public clearStroke (): void {
		this.element.style.strokeDashoffset = this.length;
		this.element.style.strokeDasharray = this.length;
	}

	public drawFill (): void {
		this.element.style.fillOpacity = "1";
	}

	public clearFill (): void {
		this.element.style.fillOpacity = "0";
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

	private collectElementData (): void {
		this.elementData.fill = this.element.getAttribute('fill') 
									? this.element.getAttribute('fill') 
									: this.element.style.fill ? this.element.style.fill : 'black';

		this.elementData.fillOpacity = this.element.getAttribute('fill-opacity') 
										? this.element.getAttribute('fill-opacity') 	
										: this.element.style.fillOpacity ? this.element.style.fillOpacity : '1' ;
	}
  
}