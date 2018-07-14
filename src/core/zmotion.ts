import AnimationManager from './animationManager';
import Path from './path';
import Line from './line';

type SVGElement = SVGSVGElement|null;

export default class ZMotion {

	private config = {
		duration: 1,
		easing: 'linear',
		animation: true,
	}

	private paths: Path[] = [];
	private lines: Line[] = [];
	// private groups: Group[] = [];
	// private circle: NodeList;
	// private rect: NodeList;
	// private polygon: NodeList;

	private pathAnimator: AnimationManager | null = null;
	private lineAnimator: AnimationManager | null = null;

	constructor (private svg: SVGElement, config?:any) {
		if (config) {
			this.config = {...this.config, ...config}
		}

		this.extractNodes();
		this.initAnimators();
		console.log(this)
	}

	public erase ():void {
		this.pathAnimator ? this.pathAnimator.clearPath() : null;
		this.lineAnimator ? this.lineAnimator.clearPath() : null;
	}

	public draw(): void {
		this.pathAnimator ? this.pathAnimator.drawPath() : null;
		this.lineAnimator ? this.lineAnimator.drawPath() : null;
	}

	public setAnimation (state: boolean): void {
		this.pathAnimator ? this.pathAnimator.setAnimation(state) : null;
		this.lineAnimator ? this.lineAnimator.setAnimation(state) : null;
	}

	private extractNodes (): void {
		if(this.svg) {
			this.svg.querySelectorAll('path').forEach(path => {
				this.paths.push(new Path(path));				
			});

			this.svg.querySelectorAll('line').forEach(line => {
				this.lines.push(new Line(line));				
			});
		}
	}

	private initAnimators (): void {
		this.paths.length ? this.pathAnimator = new AnimationManager(this.paths, this.config) : null;
		this.lines.length ? this.lineAnimator = new AnimationManager(this.lines, this.config) : null;
	}


	

}