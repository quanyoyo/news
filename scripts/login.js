"use strict";
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

btnLogin.addEventListener("click", function () {
  const isValidate = validateData();
  if (isValidate) {
    //tim user trong userArr
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );
    if (user) {
      // alert("Login successfully!");
      // save thong tin user dang active
      saveToStorage("currentUser", user);
      // ve trang home
      window.location.href = "../index.html";
    } else {
      alert("Wrong username or password, please check again!");
    }
  }
});

//ham validate data
function validateData() {
  let isValidate = true;
  if (inputUsername.value === "") {
    alert("Please fill the username!");
    isValidate = false;
  }
  if (inputPassword.value === "") {
    alert("Please fill the password!");
    isValidate = false;
  }
  return isValidate;
}
