import Path from './path';
// import Group from './group';

type SVGElement = SVGSVGElement|null;

export default class ZMotion {

  private config = {
    duration: 1,
    easing: 'linear'
  }

  private paths: Path[] = [];
  // private groups: Group[] = [];
  // private lines: NodeList;
  // private circle: NodeList;
  // private rect: NodeList;
  // private polygon: NodeList;

  constructor (private svg: SVGElement, config?:any) {
    if (config) {
      this.config = {...this.config, ...config}
    }
    
    this.extractNodes();
    this.prepareNodes();
    console.log(this)
  }

  private extractNodes () {
    if(this.svg) {
      this.svg.querySelectorAll('path').forEach(path => {
        this.paths.push(new Path(path));
      });
    }
  }

  private prepareNodes () {
    this.paths.forEach(path => {
      path.clearPath();
      path.setAnimation();      
    })
  }


  public start() {

  }

}