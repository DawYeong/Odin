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
      generateHomePage(parent);
      break;
    case "menu":
      //generate menu
      generateMenuPage(parent);
      break;
    case "about":
      //generate about
      generateAboutPage(parent);
      break;
    default:
      // default to home
      generateHomePage(parent);
      break;
  }
};
