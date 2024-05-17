import menuItem1 from "./images/menuItem1.jpg";
import menuItem2 from "./images/menuItem2.jpg";
import menuItem3 from "./images/menuItem3.jpg";
import menuItem4 from "./images/menuItem4.jpg";
import menuItem5 from "./images/menuItem5.jpg";
import menuItem6 from "./images/menuItem6.jpg";
import menuItem7 from "./images/menuItem7.jpg";
import menuItem8 from "./images/menuItem8.jpg";

const CONTENT = document.querySelector("#content");

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const createElement = (tag, cls, id, textContent, attributes = {}) => {
  const el = document.createElement(tag);
  el.className = cls;
  el.id = id;
  el.textContent = textContent;
  Object.entries(attributes).forEach((item) => {
    el.setAttribute(item[0], item[1]);
  });
  return el;
};

const createImage = (src, cls, id) => {
  const img = document.createElement("img");
  img.src = src;
  img.id = id;
  img.className = cls;
  return img;
};

const menuImages = [
  menuItem1,
  menuItem2,
  menuItem3,
  menuItem4,
  menuItem5,
  menuItem6,
  menuItem7,
  menuItem8,
];

export { CONTENT, clearElement, createElement, createImage, menuImages };
