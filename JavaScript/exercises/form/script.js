const EMAIL_REGEX = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);

const checkEmail = () => {
  const emailField = document.getElementById("email");
  const errorEmail = document.querySelector("span.error.email");
  errorEmail.textContent =
    "Email must be in the form of {username}@{mail-service}.{domain}";
  if (EMAIL_REGEX.test(emailField.value)) {
    errorEmail.classList.remove("active");
    emailField.setCustomValidity("");
  } else {
    errorEmail.classList.add("active");
    emailField.setCustomValidity(
      "Email must be in the form of {username}@{mail-service}.{domain}"
    );
  }
};

const checkZip = () => {
  // these are not 100% accurate, just need something to test for practicing form validation
  const constraints = {
    ca: [
      /^[a-zA-Z]\d[a-zA-Z]\s\d[a-zA-Z]\d$/i,
      "Canada ZIPs must be {letter}{number}{letter} {number}{letter}{number} eg. N3A 5A2",
    ],
    mx: [/^[\d]{5}$/i, "Mexico ZIPs must be 5 digits long eg. 34254"],
    kr: [
      /^[\d]{3}-[\d]{3}/i,
      "South Korea ZIPs must be 3 digits followed by 3 digits eg. 333-333",
    ],
    us: [/^[\d]{5}$/i, "US ZIPs must be 5 digits long eg. 34234"],
  };

  const country = document.getElementById("country").value;
  const zipField = document.getElementById("zip");
  const zipError = document.querySelector("span.error.zip");
  const constraint = new RegExp(constraints[country][0]);

  zipError.textContent = constraints[country][1];
  if (constraint.test(zipField.value)) {
    zipError.classList.remove("active");
    zipField.setCustomValidity("");
  } else {
    zipError.classList.add("active");
    zipField.setCustomValidity(constraints[country][1]);
  }
};

const checkPassword = () => {
  const password = document.getElementById("password");
  const passwordConfirmation = document.getElementById("confirm-password");
  const passwordError = document.querySelector("span.error.password");

  passwordError.textContent = "Passwords must match!";
  if (password.value === passwordConfirmation.value) {
    passwordError.classList.remove("active");
    passwordConfirmation.setCustomValidity("");
  } else {
    passwordError.classList.add("active");
    passwordConfirmation.setCustomValidity("Passwords must match!");
  }
};

window.onload = () => {
  document.getElementById("email").addEventListener("focusout", checkEmail);
  document.getElementById("country").onchange = checkZip;
  document.getElementById("zip").addEventListener("focusout", checkZip);
  document
    .getElementById("password")
    .addEventListener("focusout", checkPassword);
  document
    .getElementById("confirm-password")
    .addEventListener("focusout", checkPassword);

  document.getElementById("formExample").addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = [...e.target.querySelectorAll("input")];
    const msg = document.querySelector("h2.msg");
    if (inputs.every((input) => input.validity.valid)) {
      msg.textContent = "All Good! High Five!";
    } else {
      msg.textContent = "Form has error";
    }
  });
};
