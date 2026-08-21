// import { exampleComponent } from "./exampleComponent.js";
// import { homeAnimationInit } from "./testHomeAnimation.js";
import initSmallAnimation from "./testHomeAnimation2.js"
import { staggerHeadingsInit, staggerHeadingsCleanup } from "./staggerHeadings.js";
import { topBottomHeadingsInit, topBottomHeadingsCleanup } from "./topBottomHeadings.js";
import { footerInit, footerCleanup } from "./footer.js";



export const componentsInit = (page = document) => {
  console.log("components init");
  // homeAnimationInit();
  initSmallAnimation();
  staggerHeadingsInit(page);
  topBottomHeadingsInit(page);
  footerInit(page);
};

// needed only with Barba.js
export const componentsCleanup = (page = document) => {
  console.log("components cleanup");
  staggerHeadingsCleanup(page);
  topBottomHeadingsCleanup(page);
  footerCleanup(page);
};
