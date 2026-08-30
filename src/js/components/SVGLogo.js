import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// holds the gsap.context for the currently mounted svg, so
// SVGCircleCleanup can revert exactly what SVGCircleInit created
let ctx = null;

const SVGLogoInit = (page) => {
	const svg = page.querySelector(".visual-logo");
	if (!svg) return;

	gsap.registerPlugin(MorphSVGPlugin);

	ctx = gsap.context(() => {
		const path1 = svg.querySelector("[data-path-1]");
		const path2 = svg.querySelector("[data-path-2]");

		const tl1 = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
		tl1.to(path1, {
			duration: 0.9,
			ease: "power1.inOut",
			morphSVG:
				"M75.1803 164.124C109.501 158.705 122.309 114.399 122.603 86.0856C122.944 53.1334 105.981 31.8469 75.1803 16.2877C34.515 -4.25453 7.18335 31.6298 7.18335 78.0217C7.18335 124.414 36.9897 164.124 75.1803 164.124Z",
		});

		const tl2 = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
		tl2.to(path2, {
			duration: 0.9,
			ease: "power1.inOut",
			morphSVG:
				"M283.542 22.855C264.62 4.909 237.259 -2.71502 208.842 6.47318C163.995 20.9736 121.967 78.8568 163.689 126.933C205.41 175.009 271.018 156.865 291.429 130.423C307.757 109.27 330.768 91.4666 352.856 112.972C377.769 141.417 429.354 198.117 473.616 134.611C521.78 65.5056 463.596 16.1666 445.695 6.47355C426.052 -4.16221 385.312 6.7981 352.856 43.1689C315.959 79.5249 307.196 45.2875 283.542 22.855Z",
		});

		[tl1, tl2].forEach((tl) => tl.play());
	}, svg);
};

const SVGLogoCleanup = () => {
	if (!ctx) return;
	ctx.revert();
	ctx = null;
};

export { SVGLogoInit, SVGLogoCleanup };
