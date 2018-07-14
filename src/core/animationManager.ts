import Path from "./path";
import Line from "./line";

type SVGElement = SVGPathElement|SVGGElement|SVGLineElement|SVGRectElement|SVGPolygonElement|SVGCircleElement;
type SVGNode = Path|Line; // will add more

export default class AnimationManager {


    constructor (private nodes: SVGNode[], private config:any) {}

	public clearPath () {
		this.nodes.forEach(node => {
			this.config.animation ? this.enableAnimation(node.element) : this.disableAnimation(node.element);
			node.clearPath();     
		})	
	}

	public drawPath () {
		this.nodes.forEach(node => {
			this.config.animation ? this.enableAnimation(node.element) : this.disableAnimation(node.element);
			node.drawPath();     
		})	
	}

	public setAnimation (state: boolean) {
		this.config.animation = state;
	}

    public enableAnimation(element: SVGElement) {
        element.style.transition = "all";
        element.style.transitionDuration = this.config.duration +'s';
        element.style.transitionTimingFunction = this.config.easing;
    }
    
	public disableAnimation(element: SVGElement) {
		element.style.transition = "none";
		element.style.transitionDuration = '0';
	}

}