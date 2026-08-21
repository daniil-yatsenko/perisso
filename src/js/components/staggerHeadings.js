import { gsap } from "gsap";

const staggerHeadingsInit = (page) => {
  const headingLines = page.querySelectorAll(".heading-line");

  headingLines.forEach((line) => {
    gsap.from(line, { marginLeft: "0rem", ease: "expo.inOut", duration: 0.4 });
  });
};

const staggerHeadingsCleanup = () => {

};

export { staggerHeadingsInit, staggerHeadingsCleanup };
