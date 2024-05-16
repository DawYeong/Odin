import { clearElement } from "../utils";
import { generateAboutPage } from "./about";
import { generateHomePage } from "./home";
import { generateMenuPage } from "./menu";

export const generatePage = (parent, tab) => {
  // clear div
  clearElement(parent);
  switch (tab) {
    case "home":
      //generate home
      generateHomePage();
      break;
    case "menu":
      //generate menu
      generateMenuPage();
      break;
    case "about":
      //generate about
      generateAboutPage();
      break;
    default:
      // default to home
      generateHomePage();
      break;
  }
};
