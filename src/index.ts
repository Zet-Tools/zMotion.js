
declare var require: any;
declare var window: any;

const maze = require("./assets/maze.svg") as string;
import zMotion from './core/zmotion';

const appDiv: HTMLElement | null = document.getElementById('app');
if (appDiv) {
	appDiv.innerHTML = maze;
}

let zmotion = new zMotion(document.querySelector('svg'));
window.zmotion = zmotion;