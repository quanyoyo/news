"use strict";
if (currentUser) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");
  inputPageSize.value = currentUser.pageSize;
  inputCategory.value = currentUser.category;
  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      // update currentUser array
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      saveToStorage("currentUser", currentUser);

      // update lai userArr
      const index = userArr.findIndex(
        (userItem) => userItem.username === currentUser.username
      );
      // console.log(index);
      userArr[index] = currentUser;
      saveToStorage("userArr", userArr);

      // reset lai form
      alert("Setting successful!");
    }
  });

  function validate() {
    let isValidate = true;
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("Page size must be a number");
      isValidate = false;
    }
    if (inputCategory.value === "") {
      alert("Category can not be blank");
      isValidate = false;
    }
    return isValidate;
  }
} else {
  alert("Please login first");
  window.location.href = "../pages/login.html";
}
