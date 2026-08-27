import { gsap } from "gsap";

const randomSign = gsap.utils.random([-1, 1], true);

const enterTransition = async () => {
	const overlay = document.querySelector(".overlay");
	if (!overlay || overlay.style.display === "none") {
		return;
	}

	return new Promise((resolve) => {
		const tl = gsap.timeline({ onComplete: resolve });
		const lines = overlay.querySelectorAll(".overlay_line");

		lines.forEach((line) => {
			const sign = randomSign();
			const lineTl = gsap.timeline();

			lineTl.to(line, {
				y: `${sign * 15}%`,
				duration: 0.15,
				ease: "power1.inOut",
			});
			lineTl.to(line, {
				y: `${sign * 100}%`,
				duration: 0.3,
				ease: "power1.inOut",
			});

			tl.add(lineTl, 0);
		});

		tl.set(overlay, { display: "none" });
	});
};

const leaveTransition = async () => {
	const overlay = document.querySelector(".overlay");
	if (!overlay || overlay.style.display === "block") {
		return;
	}

	return new Promise((resolve) => {
		const tl = gsap.timeline({ onComplete: resolve });
		const lines = overlay.querySelectorAll(".overlay_line");

		tl.set(overlay, { display: "block" });
		lines.forEach((line) => {
			tl.to(line, { y: "0%", duration: 0.3, ease: "power1.inOut" }, 0);
		});
	});
};

export { enterTransition, leaveTransition };
