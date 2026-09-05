import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { heroMorphSteps } from "./heroMorphSteps";

gsap.defaults({ ease: "power2.inOut", duration: 0.4 });

// holds the gsap.context for the currently mounted hero, the SplitText
// instance (needs its own .revert() to restore the original markup), and
// the pending "play after delay" timeout, so homeHeroCleanup can undo
// exactly what homeHeroInit created
let ctx = null;
let splitText = null;
let playTimeoutId = null;

const homeHeroInit = (page = document) => {
	console.log("home hero init");

	//
	// svg animation
	//
	const svg = page.querySelector(".hero_svg-wrapper");
	if (!svg) return;

	gsap.registerPlugin(MorphSVGPlugin, SplitText);

	ctx = gsap.context(
		() => {
			const path1 = svg.querySelector("path");

			const tl1 = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
			heroMorphSteps.tl1.forEach((step) => tl1.to(path1, step));

			tl1.play();

			//
			// Heading animation
			//
			const CFG = {
				min: -2, //vw
				max: 2, //vw
				step: 0.25,
			};

			const randomStagger = gsap.utils.random(CFG.min, CFG.max, CFG.step, true);

			const heading = page.querySelector(".heading-lg");

			splitText = new SplitText(heading, { type: "lines, words" });
			const tl = gsap.timeline({ paused: true });

			const firstLine = splitText.lines[0];
			const lastLine = splitText.lines[splitText.lines.length - 1];
			const firstLineWords = Array.from(firstLine.children);
			const lastLineWords = Array.from(lastLine.children);

			gsap.set(firstLine, { y: CFG.min + "vw" });
			gsap.set(lastLine, { y: CFG.max + "vw" });

			firstLineWords.forEach((word, index) => {
				gsap.set(word, { y: `${randomStagger()}vw` });
			});

			firstLineWords.forEach((word, index) => {
				tl.to(word, { y: "0vw" }, "<");
			});

			lastLineWords.forEach((word, index) => {
				gsap.set(word, { y: `${randomStagger()}vw` });
			});

			lastLineWords.forEach((word, index) => {
				tl.to(word, { y: "0vw" }, "<");
			});

			tl.to(firstLine, { y: "0vw" });
			tl.to(lastLine, { y: "0vw" }, "<");

			playTimeoutId = setTimeout(() => {
				tl.play();
			}, 1000);
		},
		page === document ? undefined : page,
	);
};

const homeHeroCleanup = () => {
	if (playTimeoutId) {
		clearTimeout(playTimeoutId);
		playTimeoutId = null;
	}
	if (ctx) {
		ctx.revert();
		ctx = null;
	}
	if (splitText) {
		splitText.revert();
		splitText = null;
	}
};

export { homeHeroInit, homeHeroCleanup };
