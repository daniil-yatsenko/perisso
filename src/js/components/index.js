import {
	staggerHeadingsInit,
	staggerHeadingsCleanup,
} from "./staggerHeadings.js";
import { footerInit, footerCleanup } from "./footer.js";
import { SVGCircleInit, SVGCircleCleanup } from "./SVGCircle.js";

export const componentsInit = (page = document) => {
	console.log("components init");
	staggerHeadingsInit(page);
	footerInit(page);
	SVGCircleInit(page);
};

export const componentsCleanup = (page = document) => {
	console.log("components cleanup");
	staggerHeadingsCleanup(page);
	footerCleanup(page);
	SVGCircleCleanup(page);
};
