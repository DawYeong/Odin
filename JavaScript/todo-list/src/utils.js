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

const openFormModal = (modal) => {
  modal.showModal();
};

const closeFormModal = (modal, form) => {
  form.reset();
  modal.close();
};

export { clearElement, createElement, openFormModal, closeFormModal };
