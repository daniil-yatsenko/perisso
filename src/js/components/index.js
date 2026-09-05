import {
	staggerHeadingsInit,
	staggerHeadingsCleanup,
} from "./staggerHeadings.js";
import { footerInit, footerCleanup } from "./footer.js";
import { parallaxInit, parallaxCleanup } from "./ImageParallax.js";

export const componentsInit = (page = document) => {
	staggerHeadingsInit(page);
	footerInit(page);
	parallaxInit(page);
};

export const componentsCleanup = (page = document) => {
	staggerHeadingsCleanup(page);
	footerCleanup(page);
	parallaxCleanup(page);
};
