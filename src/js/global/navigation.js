import { gsap } from "gsap";
import { lenisMain } from "./globalInit";

var randomStagger = gsap.utils.random(-5, 5, 0.5, true);

const navbar = {
	navbarEl: document.querySelector(".navbar"),
	navLinks: document.querySelectorAll(".navbar_nav-link"),
	menuBtn: document.querySelector(".navbar_burger-wrapper"),
	linksWrapper: document.querySelector(".navbar_nav-links-wrapper"),
	links: document.querySelectorAll(".navbar_nav-link"),
	menuOpenIcon: document.querySelector(".navbar_burger-svg"),
	menuCloseIcon: document.querySelector(".navbar_cross-svg"),
	isMenuOpen: false,
	isNavbarHidden: false,
	isSetToMobile: false,
	eventListenersMap: new WeakMap(),

	openMenu() {
		const tl = gsap.timeline();
		lenisMain.stop();

		for (const link of this.links) {
			tl.set(link, { marginLeft: `${randomStagger()}rem` });
		}
		tl.set(this.linksWrapper, { display: "flex", y: "-100%" });
		tl.to(this.linksWrapper, { y: "0%", duration: 0.4, ease: "circ.inOut" });
		tl.to(this.links, {
			marginLeft: "0rem",
			ease: "circ.inOut",
			duration: 0.3,
		});
		tl.to(this.menuOpenIcon, { y: "110%" }, "<");
		tl.to(this.menuCloseIcon, { y: "0%" }, "<");
		this.isMenuOpen = true;
		return tl;
	},
	closeMenu(fast = false) {
		const tl = gsap.timeline();
		for (const link of this.links) {
			tl.to(
				link,
				{
					marginLeft: `${randomStagger()}rem`,
					ease: "circ.inOut",
					duration: 0.3,
				},
				"<",
			);
		}
		if (!fast) {
			// skipped when fast is true, AKA for page transition
			tl.to(this.linksWrapper, {
				y: "-100%",
				duration: 0.3,
				ease: "circ.inOut",
			});
		}
		tl.set(this.linksWrapper, { display: "none", y: "0%" });
		tl.set(this.links, { marginLeft: "0rem" });
		tl.to(this.menuOpenIcon, { y: "0%" });
		tl.to(this.menuCloseIcon, { y: "-110%" }, "<");

		lenisMain.start();
		this.isMenuOpen = false;
		return tl;
	},
	handleMenuClick() {
		this.menuBtn.addEventListener("click", () => {
			if (this.isMenuOpen) {
				this.closeMenu();
			} else {
				this.openMenu();
			}
		});
	},
	hide(immediate = false) {
		const tl = gsap.timeline();
		return tl;
	},
	show() {
		const tl = gsap.timeline();
		return tl;
	},
	resizeListener() {
		const resizeHandler = () => {
			const tl = gsap.timeline();

			if (window.innerWidth > 767 && this.isSetToMobile) {
				this.isMenuOpen = false;
				this.isSetToMobile = false;
			}

			if (window.innerWidth < 768 && !this.isSetToMobile) {
				this.isSetToMobile = true;
			}
			return tl;
		};

		window.addEventListener("resize", resizeHandler);
	},
	updateActiveLink() {
		const currentPath = window.location.pathname;
		for (const link of this.links) {
			if (link.getAttribute("href") === currentPath) {
				link.classList.add("w--current");
			} else {
				link.classList.remove("w--current");
			}
		}
	},
	init() {
		if (window.innerWidth < 768) {
			this.isSetToMobile = true;
		}
		this.resizeListener();
		this.handleMenuClick();
	},
};

export { navbar };
