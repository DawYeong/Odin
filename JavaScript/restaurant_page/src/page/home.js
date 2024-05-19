import { createElement } from "../utils";
import "../styles/pages/home.css";

export const generateHomePage = (parent) => {
  const homeSection = createElement("div", "", "home-section", "");
  // title
  const title = createElement("h1", "title", "", "Sashimi Sanctuary");
  // description section
  const descriptionSection = createElement(
    "p",
    "description-section",
    "",
    "Welcome to Sashimi Sanctuary, a quirky haven where traditional Japanese sashimi meets avant-garde dining. With a blend of minimalist elegance and vibrant charm, indulge in fresh, theatrically served dishes. Explore an eclectic sake bar and embark on a culinary journey that promises surprises at every turn."
  );
  const button = createElement("button", "order-btn", "", "Order Now");
  homeSection.appendChild(title);
  homeSection.appendChild(descriptionSection);
  homeSection.appendChild(button);
  parent.appendChild(homeSection);
};
