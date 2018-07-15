import Animator from './controllers/animator';
import Path from './nodes/path';
import Line from './nodes/line';
import Rect from './nodes/rect';
import Ellipse from './nodes/ellipse';
import Circle from './nodes/circle';
import Polygon from './nodes/polygon';
import Polyline from './nodes/polyline';

type SVGElement = SVGSVGElement|null;

export default class ZMotion {

	private config = {
		duration: 1,
		easing: 'linear',
		animation: true,
	}

	private paths: Path[] = [];
	private lines: Line[] = [];
	private rects: Rect[] = [];
	private ellipses: Ellipse[] = [];
	private circles: Circle[] = [];
	private polygons: Polygon[] = [];
	private polylines: Polyline[] = [];

	private animators: Animator[] = [];

	constructor (private svg: SVGElement, config?:any) {
		if (config) {
			this.config = {...this.config, ...config}
		}

		this.extractNodes();
		this.initAnimators();
		console.log(this)
	}

	public erase ():void {
		this.animators.map(animator => {
			animator.clearPath();
		})
	}

	public draw(): void {
		this.animators.map(animator => {
			animator.drawPath();
		})
	}

	public setAnimation (state: boolean): void {
		this.animators.map(animator => {
			animator.setAnimation(state);
		})
	}

	private extractNodes (): void {
		if(this.svg) {
			this.svg.querySelectorAll('path').forEach(path => {
				this.paths.push(new Path(path));				
			});

			this.svg.querySelectorAll('line').forEach(line => {
				this.lines.push(new Line(line));				
			});

			this.svg.querySelectorAll('rect').forEach(rect => {
				this.rects.push(new Rect(rect));				
			});

			this.svg.querySelectorAll('ellipse').forEach(ellipse => {
				this.ellipses.push(new Ellipse(ellipse));				
			});

			this.svg.querySelectorAll('circle').forEach(circle => {
				this.circles.push(new Circle(circle));				
			});

			this.svg.querySelectorAll('polygon').forEach(polygon => {
				this.polygons.push(new Polygon(polygon));				
			});

			this.svg.querySelectorAll('polyline').forEach(polyline => {
				this.polylines.push(new Polyline(polyline));				
			});
		}
	}

	private initAnimators (): void {
		this.paths.length ? this.animators.push(new Animator(this.paths, this.config)) : null;
		this.lines.length ? this.animators.push(new Animator(this.lines, this.config)) : null;
		this.rects.length ? this.animators.push(new Animator(this.rects, this.config)) : null;
		this.ellipses.length ? this.animators.push(new Animator(this.ellipses, this.config)) : null;
		this.circles.length ? this.animators.push(new Animator(this.circles, this.config)) : null;
		this.polygons.length ? this.animators.push(new Animator(this.polygons, this.config)) : null;
		this.polylines.length ? this.animators.push(new Animator(this.polylines, this.config)) : null;

	}


	

}