import Node from '../nodes/node';

export default class Animator {

    constructor (private nodes: Node[], private config:any) {		
		if (this.config.reverse) {
			this.nodes = this.nodes.reverse();
		}
		
		if (this.config.shuffle) {
			this.shuffle(this.nodes);
		}		
	}

	public erase (): void {
		this.nodes.forEach(node => {
			this.config.animation ? this.enableAnimation(node.element) : this.disableAnimation(node.element);
			node.clearStroke();
			node.clearFill(); 
		})	
	}

	public draw (): void {
		let delay = 0;	
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			this.config.animation ? this.enableAnimation(node.element) : this.disableAnimation(node.element);
			delay += i % this.config.elementsAtOnce ? 0 : i < this.config.elementsAtOnce ? 0 : this.config.delayBetweenElements;
			if (this.config.delayBetweenElements) {
				setTimeout(()=>{
					node.drawStroke();
					node.drawFill();
				}, delay)
			} else {
				node.drawStroke();
				node.drawFill();
			}			
		}
	}

	public setAnimation (state: boolean): void {
		this.config.animation = state;
	}

    public enableAnimation(element: SVGGElement): void {
        element.style.transition = "all";
        element.style.transitionDuration = this.config.duration +'s';
        element.style.transitionTimingFunction = this.config.easing;
    }
    
	public disableAnimation(element: SVGGElement): void {
		element.style.transition = "none";
		element.style.transitionDuration = '0';
	}

	private shuffle(a: Node[]) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
	}

}