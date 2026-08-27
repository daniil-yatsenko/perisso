import { gsap } from "gsap";

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

	openMenu(immediate = false) {
		const tl = gsap.timeline();
		tl.set(this.linksWrapper, { display: "flex" });
		for (const link of this.links) {
			tl.set(link, { marginLeft: `${randomStagger()}rem` });
		}
		tl.to(this.links, {
			marginLeft: "0rem",
			ease: "power2.inOut",
			duration: 0.3,
		});
		tl.to(this.menuOpenIcon, { y: "110%" }, "<");
		tl.to(this.menuCloseIcon, { y: "0%" }, "<");
		this.isMenuOpen = true;
		return tl;
	},
	closeMenu(immediate = false) {
		const tl = gsap.timeline();
		for (const link of this.links) {
			tl.to(
				link,
				{
					marginLeft: `${randomStagger()}rem`,
					ease: "power2.inOut",
					duration: 0.3,
				},
				"<",
			);
		}
		tl.set(this.linksWrapper, { display: "none" });
		tl.set(this.links, { marginLeft: "0rem" });
		tl.to(this.menuOpenIcon, { y: "0%" });
		tl.to(this.menuCloseIcon, { y: "-110%" }, "<");
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
