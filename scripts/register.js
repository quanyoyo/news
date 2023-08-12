"use strict";
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordCf = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

// bat event vao nut register
btnSubmit.addEventListener("click", function () {
  // lay data tu user nhap vao
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUsername.value,
    inputPassword.value
  );
  const isValidate = validateData(user);
  if (isValidate) {
    // them user vao Array
    userArr.push(user);
    //luu data xuong localStorage
    saveToStorage("userArr", userArr);
    alert("Register successfull!");
    window.location.href = "../pages/login.html";
  }
});

//ham validate data
function validateData(user) {
  let isValidate = true;
  // cac truong k dc trong
  if (user.firstName.trim().length === 0) {
    alert("Please input first name!");
    isValidate = false;
  }
  if (user.lastName.trim().length === 0) {
    alert("Please input last name!");
    isValidate = false;
  }
  if (user.username.trim().length === 0) {
    alert("Please input username!");
    isValidate = false;
  }
  if (user.password === "") {
    alert("Please input password!");
    isValidate = false;
  }
  if (inputPasswordCf.value === "") {
    alert("Please input confirm password!");
    isValidate = false;
  }

  // username k dc trung
  if (userArr.every((item) => item.username !== user.username) === false) {
    alert("Username existed!");
    isValidate = false;
  }
  // password va inputPasswordCf phai giong nhau
  if (user.password !== inputPasswordCf.value) {
    alert("Password and Confirm Password must be the same");
    isValidate = false;
  }
  // Password phải có nhiều hơn 8 ký tự
  if (user.password.length < 3) {
    alert("Password phải có nhiều hơn 8 ký tự");
    isValidate = false;
  }
  return isValidate;
}
