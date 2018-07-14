
type SVGElement = SVGPathElement|SVGGElement|SVGLineElement|SVGRectElement|SVGPolygonElement|SVGCircleElement;

export default class Core {  

  private config = {
    duration: 3,
    easing: 'linear'
  }

  constructor(config?: any) {
    if (config) {
      this.config = {...this.config, ...config};
    }    
  }

  protected enableAnimation(element: SVGElement) {
    element.style.transition = "all";
    element.style.transitionDuration = this.config.duration +'s';
    element.style.transitionTimingFunction = this.config.easing;
  }

  protected disableAnimation(element: SVGElement) {
    element.style.transition = "none";
    element.style.transitionDuration = '0';
  }
 
}