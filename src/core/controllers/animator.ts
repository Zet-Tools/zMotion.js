import Node from '../nodes/node'

type SVGElement = SVGPathElement|SVGGElement|SVGLineElement|SVGRectElement|SVGPolygonElement|SVGCircleElement;

export default class Animator {

    constructor (private nodes: Node[], private config:any) {}

	public clearPath (): void {
		this.nodes.forEach(node => {
			this.config.animation ? this.enableAnimation(node.element) : this.disableAnimation(node.element);
			node.clearPath();     
		})	
	}

	public drawPath (): void {
		this.nodes.forEach(node => {
			this.config.animation ? this.enableAnimation(node.element) : this.disableAnimation(node.element);
			node.drawPath();     
		})	
	}

	public setAnimation (state: boolean): void {
		this.config.animation = state;
	}

    public enableAnimation(element: SVGElement): void {
        element.style.transition = "all";
        element.style.transitionDuration = this.config.duration +'s';
        element.style.transitionTimingFunction = this.config.easing;
    }
    
	public disableAnimation(element: SVGElement): void {
		element.style.transition = "none";
		element.style.transitionDuration = '0';
	}

}