class Carousel {
  constructor(carousel) {
    this.carousel = carousel;
    this.buttons = carousel.querySelectorAll("[data-carousel-btn]");
    this.slides = carousel.querySelector("[data-slides]");
    this.slideChildren = [...this.slides.children];
    this.navDots = carousel.querySelector("[data-nav-dots]");
    this.navDotsChildren = [...this.navDots.children];
    this.#setTimeout();
  }

  start() {
    this.#setEventListeners();
  }

  #setEventListeners() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselBtn === "next" ? 1 : -1;
        // this.setNewSlide()
        const [activeSlide, activeDot] = this.#getActive();
        const newIndex =
          (this.slideChildren.indexOf(activeSlide) +
            offset +
            this.slideChildren.length) %
          this.slideChildren.length;
        this.#setNewSlide(newIndex, activeSlide, activeDot);
      });
    });

    this.navDots.addEventListener("click", (e) => {
      const [activeSlide, activeDot] = this.#getActive();
      if (e.target.className != "nav-dot" || e.target === activeDot) return;

      const newIndex = this.navDotsChildren.indexOf(e.target);
      this.#setNewSlide(newIndex, activeSlide, activeDot);
    });
  }

  #nextSlide() {
    const [activeSlide, activeDot] = this.#getActive();
    const newIndex =
      (this.slideChildren.indexOf(activeSlide) + 1) % this.slideChildren.length;
    this.#setNewSlide(newIndex, activeSlide, activeDot);
  }

  #setNewSlide(ind, activeSlide, activeDot) {
    this.slides.children[ind].dataset.active = true;
    this.navDots.children[ind].dataset.activeDot = true;
    delete activeSlide.dataset.active;
    delete activeDot.dataset.activeDot;

    clearTimeout(this.timeout);
    this.#setTimeout();
  }

  #getActive() {
    return [
      this.slides.querySelector("[data-active]"),
      this.navDots.querySelector("[data-active-dot]"),
    ];
  }

  #setTimeout() {
    this.timeout = setTimeout(() => {
      this.#nextSlide();
    }, 5000);
  }
}

const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const carouselObj = new Carousel(carousel);
  carouselObj.start();
});
