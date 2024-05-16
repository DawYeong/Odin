import { createElement } from "../utils";

export const generateHomePage = (parent) => {
  console.log("GENERATE HOME", parent);
  const homeSection = createElement("div", "", "home-section", "");
  console.log(homeSection);
  // title
  const title = createElement("h2", "title", "", "Sashimi Sanctuary");
  // description section
  const descriptionSection = createElement(
    "div",
    "description-section",
    "",
    "Welcome to Sashimi Sanctuary, a quirky haven where traditional Japanese sashimi meets avant-garde dining. With a blend of minimalist elegance and vibrant charm, indulge in fresh, theatrically served dishes. Explore an eclectic sake bar and embark on a culinary journey that promises surprises at every turn."
  );

  homeSection.appendChild(title);
  homeSection.appendChild(descriptionSection);
  parent.appendChild(homeSection);
};

// footer could have hours and
