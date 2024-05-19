import aboutImg from "../images/about.jpg";
import { createElement, createImage } from "../utils";
import "../styles/pages/about.css";

export const generateAboutPage = (page) => {
  console.log("GENERATE ABOUT");

  const aboutSectionWrapper = createElement(
    "div",
    "",
    "about-section-wrapper",
    ""
  );

  const pageTitle = createElement(
    "h1",
    "about-page-title",
    "",
    "Fish is Love, Fish is Life"
  );

  const aboutCompanySectionWrapper = createElement(
    "div",
    "about-company-section-wrapper",
    "",
    ""
  );
  const aboutCompanySection = createElement(
    "div",
    "section about-company",
    "",
    ""
  );
  const leftContainer = createElement("div", "left-container", "", "");
  leftContainer.appendChild(createImage(aboutImg, "", ""));
  const rightContainer = createElement("div", "right-container", "", "");
  rightContainer.appendChild(
    createElement("h2", "about-title", "", "About Us")
  );
  rightContainer.appendChild(
    createElement(
      "p",
      "about-body",
      "",
      "Welcome to Sashimi Sanctuary, where every bite is a divine journey into the heart of Japanese culinary artistry. Nestled in a tranquil corner of the city, our restaurant offers an oasis of serenity for sushi aficionados. Immerse yourself in the elegant ambiance as our skilled chefs craft exquisite sashimi platters, showcasing the freshest ingredients sourced from the sea. From delicate slices of melt-in-your-mouth tuna to intricately rolled maki, each dish is a symphony of flavors designed to tantalize the senses. Whether you're a seasoned sushi enthusiast or embarking on your first culinary adventure, Sashimi Sanctuary invites you to indulge in an unforgettable dining experience that transcends the ordinary."
    )
  );
  rightContainer.appendChild(
    createElement("button", "learn-more", "", "Learn More")
  );
  aboutCompanySection.appendChild(leftContainer);
  aboutCompanySection.appendChild(rightContainer);
  aboutCompanySectionWrapper.appendChild(aboutCompanySection);

  const customerRatingSectionWrapper = createElement(
    "div",
    "company-rating-section-wrapper",
    "",
    ""
  );

  const statSectionWrapper = createElement(
    "div",
    "stat-section-wrapper",
    "",
    ""
  );

  aboutSectionWrapper.appendChild(pageTitle);
  aboutSectionWrapper.appendChild(aboutCompanySectionWrapper);
  aboutSectionWrapper.appendChild(customerRatingSectionWrapper);
  aboutSectionWrapper.appendChild(statSectionWrapper);

  page.appendChild(aboutSectionWrapper);
};
