import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const staggerHeadingsInit = (page = document) => {
	gsap.registerPlugin(ScrollTrigger);
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
};

const staggerHeadingsCleanup = () => {};

export { staggerHeadingsInit, staggerHeadingsCleanup };
