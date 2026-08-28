import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// holds the gsap.context for the currently mounted page, so
// staggerHeadingsCleanup can revert exactly what staggerHeadingsInit created
let ctx = null;

const staggerHeadingsInit = (page = document) => {
	gsap.registerPlugin(ScrollTrigger);

	ctx = gsap.context(() => {
		const headingLines = page.querySelectorAll(".heading-line");

		headingLines.forEach((line) => {
			const tl = gsap.timeline({ paused: true });

			tl.from(line, {
				marginLeft: "0rem",
				ease: "power3.inOut",
				duration: 0.4,
				delay: 0.4,
			});

			ScrollTrigger.create({
				trigger: line,
				start: "bottom bottom",
				onEnter: () => {
					tl.play();
				},
				onLeaveBack: () => {
					tl.reverse();
				},
			});
		});
	}, page);
};

const staggerHeadingsCleanup = () => {
	if (!ctx) return;
	ctx.revert();
	ctx = null;
};

export { staggerHeadingsInit, staggerHeadingsCleanup };
