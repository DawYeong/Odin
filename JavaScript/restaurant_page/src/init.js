import { generatePage } from "./page/pageFactory";

export const initialPageLoad = () => {
  const nav = document.querySelector("nav.nav-header");
  const content = document.querySelector("#content");
  // add listener to nav to listen for tab button presses

  nav.addEventListener("click", function (e) {
    // console.log(e.target.attributes["tab"].value);
    generatePage(content, e.target.attributes["tab"].value);
  });

  generatePage(content, "home");
};
