import { generatePage } from "./page/pageFactory";
import { CONTENT, createElement, createImage } from "./utils";
import sashimi from "./images/sashimi.jpg";

const createHeader = () => {
  const header = createElement("header", "", "", "");
  const title = createElement("p", "", "", "Sashimi Sanctuary");
  const nav = createElement("nav", "nav-header", "", "");
  nav.appendChild(createElement("button", "", "", "Home", { page: "home" }));
  nav.appendChild(createElement("button", "", "", "Menu", { page: "menu" }));
  nav.appendChild(createElement("button", "", "", "About", { page: "about" }));

  header.appendChild(title);
  header.appendChild(nav);
  document.body.insertBefore(header, CONTENT);
};

export const initialPageLoad = () => {
  createHeader();
  //   const backgroundImage = createImage(sashimi, "background-image", "");
  //   document.body.insertBefore(backgroundImage, CONTENT);
  const nav = document.querySelector("nav.nav-header");
  // add listener to nav to listen for tab button presses

  nav.addEventListener("click", function (e) {
    // console.log(e.target.attributes["tab"].value);
    generatePage(CONTENT, e.target.attributes["page"].value);
  });

  generatePage(CONTENT, "home");
};
