import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// stagger for each of "Perisso" letters, from -3 to 3;
const logoStaggerConfig = {
	"/": [3, 2, -3, 3, 0, 0, 2],
	"/platform": [-1, 3, 1, 3, -3, 1, -1],
	"/solutions": [2, -2, 0, -1, 3, -3, 1],
	"/pricing": [-3, 0, 2, -1, 1, 3, -2],
	"/about": [1, -1, 3, -2, 0, 2, -3],
	"/founders": [-2, 3, -1, 0, -3, 1, 2],
	"/contact": [0, -3, 1, 2, -1, -2, 3],
};

// stagger multiplier dependent on viewport width
let multiplier = 1;
const vw = window.innerWidth;
if (vw < 2000) multiplier = 1.2;
if (vw < 1500) multiplier = 1.8;
if (vw < 1000) multiplier = 2.2;
if (vw < 768) multiplier = 5;
if (vw < 600) multiplier = 6;
if (vw < 400) multiplier = 12;

const footerInit = (page) => {
	gsap.registerPlugin(ScrollTrigger);
	const footer = page.querySelector(".footer");
	if (!footer) return;

	const bgImage = footer.querySelector(".image-absolute");

	gsap.to(bgImage, {
		scale: 1.1,
		ease: "none",
		scrollTrigger: {
			trigger: footer,
			start: "top bottom",
			end: "bottom bottom",
			scrub: true,
		},
	});

	const logoWrapper = footer.querySelector(".footer_logo-wrapper");
	const paths = logoWrapper.querySelectorAll("path");

	const slug = window.location.pathname;

	// configure stagger based on current page slug
	let configToUse = logoStaggerConfig["/"];
	if (logoStaggerConfig[slug]) configToUse = logoStaggerConfig[slug];

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: footer,
			start: "center bottom",
			end: "bottom bottom",
			scrub: 1,
		},
	});

	paths.forEach((path, index) => {
		const stagger = configToUse[index] * multiplier;
		tl.from(
			path,
			{
				y: `${-stagger}vw`,
				duration: 1,
				ease: "linear",
			},
			"<",
		);
	});
};

const footerCleanup = (page) => {};

export { footerInit, footerCleanup };
