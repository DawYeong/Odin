const CONTENT = document.querySelector("#content");

const clearElement = (element) => {
  while (element.firstChild) {
    element.remove(element.lastChild);
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

export { CONTENT, clearElement, createElement, createImage };
