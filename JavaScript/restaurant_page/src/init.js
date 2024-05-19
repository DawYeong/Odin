import { generatePage } from "./page/pageFactory";
import { CONTENT, createElement } from "./utils";

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

const createInfoSection = () => {
  const infoSectionWrapper = createElement(
    "div",
    "",
    "info-section-wrapper",
    ""
  );
  const infoSection = createElement("div", "", "info-section", "");

  const contact = createElement("div", "contact", "", "");
  contact.appendChild(createElement("h2", "", "", "Contact"));
  contact.appendChild(
    createElement("p", "", "", "Address: 123 Miso Lane, Soy Sauce City")
  );
  contact.appendChild(createElement("p", "", "", "Phone: (555) 123-4567"));
  contact.appendChild(
    createElement("p", "", "", "Email: rollandmunch@sashimisanctuary.com")
  );

  const operatingHours = createElement("div", "hours", "", "");
  operatingHours.appendChild(createElement("h2", "", "", "Business hour"));
  const hourList = createElement("ul", "hour-list", "", "");
  hourList.appendChild(
    createElement("li", "", "", "Mon - Thur: 11:30-3:00 4:00-9:30")
  );
  hourList.appendChild(createElement("li", "", "", "Friday: 4:00-10:30"));
  hourList.appendChild(createElement("li", "", "", "Saturday: 12:00-9:30"));
  hourList.appendChild(createElement("li", "", "", "Sunday: 12:00-8:00"));
  operatingHours.appendChild(hourList);

  const subscribeEmail = createElement("div", "subscribe", "", "");
  subscribeEmail.appendChild(createElement("h2", "", "", "Subscribe"));
  subscribeEmail.appendChild(
    createElement("input", "", "", "", { placeholder: "E-Mail" })
  );
  subscribeEmail.appendChild(createElement("button", "", "", "subscribe"));

  infoSection.appendChild(contact);
  infoSection.appendChild(operatingHours);
  infoSection.appendChild(subscribeEmail);

  infoSectionWrapper.appendChild(infoSection);

  document.body.appendChild(infoSectionWrapper);
};

const createFooter = () => {
  const footer = createElement("div", "", "footer-section", "");
  const footerContent = createElement(
    "a",
    "footer-content",
    "",
    "Background image by Valeria Boltneva",
    {
      href: "https://www.pexels.com/photo/close-up-photo-of-sliced-salmon-1683545/",
    }
  );

  footer.appendChild(footerContent);
  document.body.appendChild(footer);
};

export const initialPageLoad = () => {
  createHeader();
  const nav = document.querySelector("nav.nav-header");
  // add listener to nav to listen for tab button presses

  nav.addEventListener("click", function (e) {
    generatePage(CONTENT, e.target.attributes["page"].value);
  });

  generatePage(CONTENT, "home");
  createInfoSection();
  createFooter();
};
