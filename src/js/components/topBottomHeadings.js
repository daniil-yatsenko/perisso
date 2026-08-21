import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.defaults({ ease: "power2.inOut", duration: 0.4 });

// const CFG = {
//   firstLine: {
//     0: {
//       y: "1vw"
//     },
//     1: {
//       y: "-2vw"
//     },
//     2: {
//       y: "-1vw"
//     },
//     3: {
//       y: "1.5vw"
//     }
//   },
//   lastLine: {
//     0: {
//       y: "-1vw"
//     },
//     1: {
//       y: "2vw"
//     },
//     2: {
//       y: "1vw"
//     },
//     3: {
//       y: "-2vw"
//     }
//   }
// };
//
const CFG = {
  min: -2, //vw
  max: 2, //vw
  step: 0.25
}
// gsap function
var randomStagger = gsap.utils.random(CFG.min, CFG.max, CFG.step, true);


const topBottomHeadingsInit = (page) => {
  gsap.registerPlugin(SplitText)

  const headings = page.querySelectorAll(".heading-lg");
  headings.forEach((heading) => {
    const splitText = new SplitText(heading, { type: "lines, words" });
    const tl = gsap.timeline({ paused: true });

    const firstLine = splitText.lines[0];
    const lastLine = splitText.lines[splitText.lines.length - 1];
    const firstLineWords = Array.from(firstLine.children);
    const lastLineWords = Array.from(lastLine.children);

    gsap.set(firstLine, {y: CFG.min+"vw"})
    gsap.set(lastLine, { y: CFG.max+"vw" })

    firstLineWords.forEach((word, index) => {
      // console.log(word);
      gsap.set(word, { y: `${randomStagger()}vw` })
    });

    firstLineWords.forEach((word, index) => {
      tl.to(word, {y: "0vw"}, "<")
    });

    lastLineWords.forEach((word, index) => {
      gsap.set(word, { y: `${randomStagger()}vw` })
    });

    lastLineWords.forEach((word, index) => {
      tl.to(word, {y: "0vw"}, "<")
    });

    tl.to(firstLine, {y: "0vw"});
    tl.to(lastLine, {y: "0vw"}, "<");

    setTimeout(() => {
      tl.play();
    }, 1000);
  });
};

const topBottomHeadingsCleanup = (page) => {

};

export { topBottomHeadingsInit, topBottomHeadingsCleanup };
