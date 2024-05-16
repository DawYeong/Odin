const clearElement = (element) => {
  while (element.firstChild) {
    element.remove(element.lastChild);
  }
};

export { clearElement };
