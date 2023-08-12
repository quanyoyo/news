"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMsg = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

function displayHome() {
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    // show welcomeMsg
    welcomeMsg.textContent = `Welcome ${currentUser.firstName}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
displayHome();
//logout
btnLogout.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  loginModal.style.display = "block";
  mainContent.style.display = "none";
});
