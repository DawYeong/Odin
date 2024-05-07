const form = document.querySelector("#form1");

form.addEventListener("submit", (e) => {
  const isValid = e.target[4].value === e.target[5].value;
  const error = e.target[4].nextElementSibling;

  if (!isValid) {
    e.target[4].className = "invalid";
    e.target[5].className = "invalid";
    error.innerText = "* Passwords do not match";
    e.preventDefault();
  } else {
    e.target[4].className = "";
    e.target[5].className = "";
    error.innerText = "";
  }
});
