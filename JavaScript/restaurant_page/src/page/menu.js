import { createElement, createImage, menuImages } from "../utils";
import "../styles/pages/menu.css";

const createMenuItem = (img, title, price, description) => {
  const menuItem = createElement("div", "menu-item", "", "");

  const imageWrapper = createElement("div", "image-wrapper", "", "");
  imageWrapper.appendChild(createImage(img, "", ""));
  menuItem.appendChild(imageWrapper);

  const titleSection = createElement("div", "menu-title-section", "", "");
  titleSection.appendChild(createElement("h3", "", "", title));
  titleSection.appendChild(createElement("div", "price", "", `$${price}`));

  menuItem.appendChild(titleSection);

  menuItem.appendChild(createElement("p", "item-description", "", description));
  menuItem.appendChild(
    createElement("button", "menu-order-btn", "", "Order Now")
  );

  return menuItem;
};

export const generateMenuPage = (parent) => {
  const menuSectionWrapper = createElement(
    "div",
    "",
    "menu-section-wrapper",
    ""
  );
  const pageTitle = createElement(
    "h1",
    "menu-page-title",
    "",
    "Choose according to your taste"
  );
  const menuSection = createElement("div", "", "menu-section", "");
  menuSection.appendChild(createElement("h2", "menu-title", "", "Our Menu"));
  menuSection.appendChild(
    createElement(
      "p",
      "menu-description",
      "",
      "Indulge in our meticulously crafted sashimi platters, a symphony of fresh flavors that celebrate the sea's bounty with every exquisite slice."
    )
  );

  const menuItems = createElement("div", "menu-items", "", "");
  menuItems.appendChild(
    createMenuItem(
      menuImages[0],
      "Salmon Roll",
      "10.30",
      "A delicate fusion of premium sushi rice, fresh Atlantic salmon, creamy avocado, and crisp cucumber."
    )
  );
  menuItems.appendChild(
    createMenuItem(
      menuImages[1],
      "Salmon Sashimi",
      "15.00",
      "Thinly sliced, buttery-smooth Atlantic salmon, delicately garnished."
    )
  );
  menuItems.appendChild(
    createMenuItem(
      menuImages[2],
      "Assorted Sushi Rolls",
      "27.90",
      "A tantalizing selection of handcrafted rolls featuring premium ingredients."
    )
  );
  menuItems.appendChild(
    createMenuItem(
      menuImages[3],
      "Salmon Bowl",
      "20.80",
      "Tender flakes of salmon on white rice, accompanied by fresh vegetables and savory seasonings."
    )
  );
  menuItems.appendChild(
    createMenuItem(
      menuImages[4],
      "Salmon Tuna Roll",
      "18.50",
      "A delectable fusion of succulent salmon and tender tuna, perfectly rolled with creamy avocado."
    )
  );
  menuItems.appendChild(
    createMenuItem(
      menuImages[5],
      "Tuna Sashimi",
      "16.50",
      "Expertly sliced, fresh tuna, showcasing its buttery texture and delicate flavor with every bite."
    )
  );
  menuItems.appendChild(
    createMenuItem(
      menuImages[6],
      "Assorted Sashimi",
      "30.00",
      "A curated selection of premium cuts from the sea, offering a symphony of flavors and textures."
    )
  );
  menuItems.appendChild(
    createMenuItem(
      menuImages[7],
      "Salmon Sushi",
      "14.00",
      "Expertly crafted bites of salmon atop seasoned rice, delivering a burst of freshness."
    )
  );

  menuSection.appendChild(menuItems);
  menuSection.appendChild(
    createElement("button", "see-more-btn", "", "See More")
  );

  menuSectionWrapper.appendChild(pageTitle);
  menuSectionWrapper.appendChild(menuSection);

  parent.appendChild(menuSectionWrapper);
};
