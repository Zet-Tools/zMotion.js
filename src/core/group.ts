import Core from './core';

export default class Group extends Core {
  public node: SVGGElement;
  public length: number;

  constructor(group: SVGGElement) {
    super();
    this.node = group;
  }
  
}