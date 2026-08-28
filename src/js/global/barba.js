import barba from "@barba/core";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import gsap from "gsap";
import { lenisMain } from "./globalInit.js";
import { navbar } from "./navigation.js";
import { componentsInit, componentsCleanup } from "../components/index.js";
import { homeHeroInit, homeHeroCleanup } from "../pages/home/index.js";
import { enterTransition, leaveTransition } from "./transitions/default.js";

export function initBarba() {
	console.log("initBarba");
	barba.init({
		debug: true, // Remove in production
		transitions: [
			{
				name: "default-transition",
				beforeOnce(data) {},
				async once(data) {
					componentsInit(data.next.container);
					await enterTransition();
				},
				async leave(data) {
					lenisMain.stop();
					if (navbar.isSetToMobile && navbar.isMenuOpen) {
						navbar.closeMenu(true); // true enables fast menu close
					}
					await leaveTransition();
					// Close menu first, wait for animation to complete
					// await navbar.closeMenu();
				},
				afterLeave(data) {
					console.log("after leave");
					componentsCleanup(data.current.container);
					lenisMain.start();
					lenisMain.scrollTo(0, { immediate: true });
					lenisMain.stop();
				},
				beforeEnter(data) {},

				afterEnter() {
					setTimeout(() => {
						lenisMain.resize();
						ScrollTrigger.refresh();
					}, 50);
					navbar.updateActiveLink();
				},
				async after(data) {
					componentsInit(data.next.container);
					await enterTransition();
					lenisMain.start();
				},
			},
		],
		views: [
			{
				namespace: "home",
				afterOnce() {},
				beforeEnter(data) {
					homeHeroInit(data.next.container);
				},
				afterEnter(data) {},
				beforeLeave() {},
			},
		],
	});
}
