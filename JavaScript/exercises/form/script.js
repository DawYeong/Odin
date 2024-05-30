const EMAIL_REGEX = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);

const checkEmail = () => {
  const emailField = document.getElementById("email");

  if (EMAIL_REGEX.test(emailField.value)) {
    emailField.setCustomValidity("");
  } else {
    emailField.setCustomValidity(
      "Email must be in the form of {username}@{mail-service}.{domain}"
    );
    emailField.reportValidity();
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
  const constraint = new RegExp(constraints[country][0]);

  if (constraint.test(zipField.value)) {
    zipField.setCustomValidity("");
  } else {
    zipField.setCustomValidity(constraints[country][1]);
    zipField.reportValidity();
  }
};

window.onload = () => {
  document.getElementById("email").oninput = checkEmail;
  document.getElementById("country").onchange = checkZip;
  document.getElementById("zip").oninput = checkZip;
};
