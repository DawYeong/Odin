document.addEventListener("click", (e) => {
  const isDropDownButton = e.target.matches("[data-dropdown-button]");
  const currentDropdown = e.target.closest("[data-dropdown]");

  // don't do anything when clicking in a drop down
  if (!isDropDownButton && currentDropdown != null) return;

  // close the rest
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    dropdown.classList.remove("active");
  });

  if (isDropDownButton) {
    currentDropdown.classList.toggle("active");
  }
});
