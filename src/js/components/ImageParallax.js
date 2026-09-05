import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// holds the gsap.context for the currently mounted page, so parallaxCleanup
// can revert exactly what parallaxInit created (tweens + ScrollTriggers)
let ctx = null;

const parallaxInit = (page = document) => {
	gsap.registerPlugin(ScrollTrigger);

	ctx = gsap.context(() => {
		const images = page.querySelectorAll("[data-parallax-image]");

		images.forEach((el) => {
			// at scale 0.9 the element leaves 5% headroom top and bottom, so a
			// 5% drift never spills outside its original bounds — no
			// overflow-hidden wrapper needed in Webflow
			gsap.fromTo(
				el,
				{ scale: 0.9, y: "5%" },
				{
					scale: 1,
					y: "0%",
					ease: "none",
					scrollTrigger: {
						trigger: el,

						start: "top bottom",
						end: "center center",
						scrub: 2,
						invalidateOnRefresh: true,
					},
				},
			);
		});
	}, page);
};

const parallaxCleanup = () => {
	if (!ctx) return;
	ctx.revert();
	ctx = null;
};

export { parallaxInit, parallaxCleanup };
