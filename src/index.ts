
declare var require: any;
declare var window: any;

const svgs = require("./assets/items.svg") as string;
import zMotion from './core/zmotion';

const appDiv: HTMLElement | null = document.getElementById('app');
if (appDiv) {
	appDiv.innerHTML = svgs;
}

let zmotion = new zMotion(document.querySelector('svg'), {
	shuffle: true
});
zmotion.erase().enableAnimation(true);

window.zmotion = zmotion;