import barba from "@barba/core";
import gsap from "gsap";
import { lenisMain } from "./globalInit.js";
import { navbar } from "./navigation.js";

export function initBarba() {
	console.log("initBarba");
	barba.init({
		// debug: true, // Remove in production
		transitions: [
			{
				name: "default-transition",
				once(data) {},
				async leave(data) {
					// Close menu first, wait for animation to complete
					// await navbar.closeMenu();
				},
				afterLeave(data) {
					// console.log("after leave");
					componentsCleanup(data.current.container);
					lenisMain.scrollTo(0, { immediate: true });
				},
				enter(data) {
					componentsInit(data.next.container);
				},
				afterEnter() {
					setTimeout(() => {
						lenisMain.resize();
						ScrollTrigger.refresh();
					}, 50);
				},
			},
		],
		views: [
			{
				namespace: "home",
				beforeEnter() {},
				beforeLeave() {},
			},
			{
				namespace: "password",
				beforeEnter(data) {},
			},
		],
	});
}
