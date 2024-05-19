import aboutImg from "../images/about.jpg";
import {
  createElement,
  createImage,
  serviceIcons,
  customersPfp,
} from "../utils";
import "../styles/pages/about.css";

const createValueItem = (img, title, desc) => {
  const valueItem = createElement("div", "value-item", "", "");
  valueItem.appendChild(createImage(img, "", ""));
  valueItem.appendChild(createElement("h3", "service-title", "", title));
  valueItem.appendChild(createElement("p", "service-desc", "", desc));
  return valueItem;
};

const createUserReview = (img, review, name) => {
  const reviewItem = createElement("div", "review-item", "", "");
  reviewItem.appendChild(createImage(img, "", ""));
  reviewItem.appendChild(createElement("p", "", "", review));
  reviewItem.appendChild(createElement("h3", "", "", name));
  return reviewItem;
};

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

  const companyValuesSection = createElement(
    "div",
    "section company-values",
    "",
    ""
  );
  companyValuesSection.appendChild(
    createElement("h2", "value-title", "", "Why Choose Us?")
  );
  companyValuesSection.appendChild(
    createElement(
      "p",
      "value-desc",
      "",
      "Savor the freshest sashimi and expertly crafted sushi rolls in a serene ambiance at Sashimi Sanctuary."
    )
  );
  const valueItems = createElement("div", "value-items", "", "");
  valueItems.appendChild(
    createValueItem(
      serviceIcons[0],
      "Service 1",
      "Our service extends beyond excellence; it's an art form. From warm welcomes to attentive recommendations, we ensure your dining experience is as memorable as our exquisite dishes."
    )
  );
  valueItems.appendChild(
    createValueItem(
      serviceIcons[1],
      "Service 2",
      "Our service extends beyond excellence; it's an art form. From warm welcomes to attentive recommendations, we ensure your dining experience is as memorable as our exquisite dishes."
    )
  );
  valueItems.appendChild(
    createValueItem(
      serviceIcons[2],
      "Service 3",
      "Our service extends beyond excellence; it's an art form. From warm welcomes to attentive recommendations, we ensure your dining experience is as memorable as our exquisite dishes."
    )
  );
  valueItems.appendChild(
    createValueItem(
      serviceIcons[3],
      "Service 4",
      "Our service extends beyond excellence; it's an art form. From warm welcomes to attentive recommendations, we ensure your dining experience is as memorable as our exquisite dishes."
    )
  );
  valueItems.appendChild(
    createValueItem(
      serviceIcons[4],
      "Service 5",
      "Our service extends beyond excellence; it's an art form. From warm welcomes to attentive recommendations, we ensure your dining experience is as memorable as our exquisite dishes."
    )
  );
  valueItems.appendChild(
    createValueItem(
      serviceIcons[5],
      "Service 6",
      "Our service extends beyond excellence; it's an art form. From warm welcomes to attentive recommendations, we ensure your dining experience is as memorable as our exquisite dishes."
    )
  );

  companyValuesSection.appendChild(valueItems);
  aboutCompanySectionWrapper.appendChild(companyValuesSection);

  const customerRatingSectionWrapper = createElement(
    "div",
    "company-rating-section-wrapper",
    "",
    ""
  );
  const customerRatingSection = createElement(
    "div",
    "company-rating-section",
    "",
    ""
  );
  customerRatingSection.appendChild(
    createElement("h2", "", "", "Listen to our valued customers!")
  );
  customerRatingSection.appendChild(
    createElement(
      "p",
      "rating-desc",
      "",
      "At Sashimi Sanctuary, we value our customer input, as it helps us continually refine and perfect our culinary offerings to exceed your expectations."
    )
  );
  const reviewItems = createElement("div", "review-items", "", "");
  reviewItems.appendChild(
    createUserReview(
      customersPfp[0],
      "Sashimi Sanctuary changed my life by introducing me to a world of exquisite flavors and culinary artistry, leaving an indelible mark on my palate and enriching my dining experiences forever.",
      "Customer 1"
    )
  );
  reviewItems.appendChild(
    createUserReview(
      customersPfp[1],
      "Sashimi Sanctuary changed my life by introducing me to a world of exquisite flavors and culinary artistry, leaving an indelible mark on my palate and enriching my dining experiences forever.",
      "Customer 2"
    )
  );
  reviewItems.appendChild(
    createUserReview(
      customersPfp[2],
      "Sashimi Sanctuary changed my life by introducing me to a world of exquisite flavors and culinary artistry, leaving an indelible mark on my palate and enriching my dining experiences forever.",
      "Customer 3"
    )
  );
  customerRatingSection.appendChild(reviewItems);

  customerRatingSectionWrapper.appendChild(customerRatingSection);

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
