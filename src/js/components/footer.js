//.home-footer_svg-wrapper
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CFG = {
  min: -10, //vw
  max: 10, //vw
  step: 1
}
// gsap function
var randomStagger = gsap.utils.random(CFG.min, CFG.max, CFG.step, true);

const footerInit = (page) => {
  const footer = page.querySelector('.home-footer_svg-wrapper');
  console.log(footer);

  const tl = gsap.timeline({ paused: true });
  const letters = footer.querySelectorAll('path');

  letters.forEach((letter) => {
    tl.to(letter, { y: `${randomStagger()}vw` }, "<");
  });

  ScrollTrigger.create({
    trigger: footer,
    start: 'center bottom',
    endTrigger: '.main-wrapper',
    end: 'bottom bottom',
    animation: tl,
    scrub: true,
  });



};

const footerCleanup = (page) => {

};

export { footerInit, footerCleanup };
