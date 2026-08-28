import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { SplitText } from "gsap/SplitText";

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

	ctx = gsap.context(() => {
		const path1 = svg.querySelector("[data-path-1]");
		const path2 = svg.querySelector("[data-path-2]");
		const path3 = svg.querySelector("[data-path-3]");

		const tl1 = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
		tl1.to(path1, {
			duration: 0.8,
			morphSVG:
				"M54.4848 265.571C114.965 265.571 177.679 236.111 199.997 171.836C234.812 98.6338 213.164 -3.13525 152.683 -3.13525C92.2024 -3.13525 49.1284 35.2513 15.2055 105.776C-4.43432 174.514 -5.99581 265.571 54.4848 265.571Z",
		});

		const tl2 = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
		tl2.to(path2, {
			duration: 0.9,
			morphSVG:
				"M1647.15 255.526C1707 233.021 1716.55 161.641 1698.94 100.154C1679.7 32.9658 1600.16 6.93089 1539.68 6.93089C1479.2 6.93089 1466.5 121.149 1508.61 184.314C1541.21 233.22 1592.13 276.213 1647.15 255.526Z",
		});

		const tl3 = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
		tl3.to(path3, {
			duration: 1.2,
			ease: "linear",
			morphSVG: {
				shape:
					"M1281.79 17.3106C1257.73 17.3106 1234.95 21.8295 1214.44 29.7375V29.5761C1186.98 38.1297 1162.43 61.5883 1138.77 87.4104C1115.83 111.78 1107.14 68.7512 1107.14 68.7512C1107.14 68.7512 1095.72 47.4077 1083.09 37.511C1058.08 17.9166 1034.7 0.149597 1001.41 0.149597C964.697 0.149597 943.122 18.2425 919.149 42.4334C909.166 52.843 894.932 64.8264 886.104 76.2043C864.653 103.64 858.63 118.771 836.765 91.1735C827.69 79.7149 816.881 63.5354 806.898 52.8031L805.826 51.6733C785.446 26.9002 757.064 11.3262 725.464 11.3262C695.724 11.3262 669.325 14.79 647.578 33.8109C635.677 43.5116 622.218 81.1192 610.929 91.4963C610.929 91.4963 594.185 112.8 566.753 88.4299C536.662 60.9738 525.948 42.3283 479.069 22.4649C455.726 12.5742 427.393 10.1187 398.609 10.1187C292.843 10.1187 252.541 58.7794 252.541 131.969C252.541 205.159 292.843 251.361 398.609 251.361C420.728 251.361 441.882 248.617 461.683 243.857V244.018C495.774 238.031 535.057 209.352 558.148 188.06C604.221 148.44 615.01 175.916 615.01 175.916C631.115 190.744 645.2 217.778 663.584 229.89C681.323 243.85 702.61 252.081 725.547 252.081C757.312 252.081 785.942 236.345 806.321 211.088C816.139 200.598 825.132 182.686 833.548 171.066C854.174 142.581 865.148 126.966 886.104 155.048C894.932 166.91 902.606 185.144 912.836 195.796C933.215 220.973 961.845 236.789 993.61 236.789C1016.55 236.789 1033.46 227.543 1055.57 214.598C1078.03 201.454 1095.41 178.088 1107.14 161.382C1107.14 161.382 1116.13 142.249 1154.65 181.79C1173.94 203.063 1200.65 249.982 1229.14 255.965V255.804C1245.61 260.565 1263.3 263.308 1281.79 263.308C1370.23 263.308 1454.56 206.478 1454.56 133.289C1454.56 60.099 1370.23 17.3106 1281.79 17.3106Z",
				shapeIndex: 0,
			},
		});

		[tl1, tl2, tl3].forEach((tl) => tl.play());

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
	}, page === document ? undefined : page);
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
