// CLOSE NAVIAGION
const dropdownNav = document.querySelector("#nav-toggle");
document.querySelectorAll(".nav-link-button").forEach((link) => {
  link.addEventListener("click", () => {
    dropdownNav.checked = false;
  });
});

// select POLL CHOICES buttons and then activate POLL SUBMIT button
const pollSubmit = document.querySelector("#poll-submit");
const pollChoices = [
  document.querySelector("#approve"),
  document.querySelector("#decline"),
];
// had to put it in Try/catch. Otherwise it caused an error on the
// page where the buttons are not present
try {
  pollChoices.forEach((button) => {
    button.addEventListener("click", () => {
      pollSubmit.classList.remove("inactive"),
        pollSubmit.classList.add("link-color-bg");
    });
  });
} catch {}

// OPEN CONTACT MODAL
const openContactBtn = document.querySelector("#open-contact-btn");
const contactModal = document.querySelector(".modal-contact");
const closeContactBtn = document.querySelector("#close-contact-btn");
const navOpenContact = document.querySelector("#nav-contact");
// Listen to several open Contact buttons
try {
  [navOpenContact, openContactBtn].forEach((item) => {
    item.addEventListener("click", () => {
      contactModal.classList.add("show-modal");
    });
  });
} catch (error) {
  //
}

navOpenContact.addEventListener("click", () => {
  contactModal.classList.add("show-modal");
});

// Close contact modal
closeContactBtn.addEventListener("click", () =>
  contactModal.classList.remove("show-modal")
);
// Close by clicking anywhere outside form
window.addEventListener("click", (event) =>
  event.target == contactModal
    ? contactModal.classList.remove("show-modal")
    : false
);

// EMAIL VALIDATION BEGIN
const form = document.querySelector("#contact-form");
form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();
  // first name container and value
  const firstname = document.querySelector("#firstname");
  const firstnameError = document.querySelector("#firstname-error");
  const firstnameValue = firstname.value.trim();

  // // answer container and value
  const lastname = document.querySelector("#lastname");
  const lastnameError = document.querySelector("#lastname-error");
  const lastnameValue = lastname.value.trim();

  // email container and value
  const email = document.querySelector("#email");
  const emailError = document.querySelector("#email-error");
  const emailValue = email.value;
  const regEx = /\S+@\S+\.\S+/;

  // message container and value
  const message = document.querySelector("#message");
  const messageError = document.querySelector("#message-error");
  const messageValue = message.value.trim();

  let formSuccess = [];
  // test name
  if (firstnameValue.length === 0 || firstnameValue.length > 50) {
    firstnameError.style.display = "block";
  } else {
    firstnameError.style.display = "none";
    formSuccess.push(firstnameValue);
  }
  // test answer
  if (lastnameValue.length === 0 || lastnameValue.length > 50) {
    lastnameError.style.display = "block";
  } else {
    lastnameError.style.display = "none";
    formSuccess.push(lastnameValue);
  }

  // test email
  if (regEx.test(emailValue) === true) {
    emailError.style.display = "none";
    formSuccess.push(emailValue);
  } else {
    emailError.style.display = "block";
  }
  //test message
  if (messageValue.length === 0 || messageValue.length > 300) {
    messageError.style.display = "block";
  } else {
    messageError.style.display = "none";
    formSuccess.push(messageValue);

    if (formSuccess.length === 4) {
      form.innerHTML += `<p class="success text-large font-oswald">Message is sent!<p>`;
    }
  }
}
