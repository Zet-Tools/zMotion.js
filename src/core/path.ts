import Core from './core';

export default class Path extends Core{
  private node: SVGPathElement;
  public length: string;
  public visible: boolean = true;

  constructor(path: SVGPathElement, config?: any) {
    super(config);
    this.node = path;
    this.length = this.getPathLength();
  }

  private getPathLength(): string {
    return this.node.getTotalLength().toString();
  }

  public drawPath() {
    this.node.style.strokeDashoffset = '0';
    this.visible = true;
  }

  public clearPath() {
    this.node.style.strokeDashoffset = this.length;
    this.node.style.strokeDasharray = this.length;
    this.visible = false;
  }

  public setAnimation (animate: boolean = true) {
    setTimeout(()=>{
      if (animate) {
        this.enableAnimation(this.node);
      } else {
        this.disableAnimation(this.node);
      }
    });        
  }
}