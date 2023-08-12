"use strict";
if (currentUser) {
  const btnAdd = document.getElementById("btn-add");
  const inputTitle = document.getElementById("input-task");
  const btnDel = document.querySelector(".close");
  const todoList = document.getElementById("todo-list");

  // show task
  renderTodoList(todoArr);

  //them task
  btnAdd.addEventListener("click", function () {
    // lay data tu user nhap vao
    const task = new Task(inputTitle.value, currentUser.username, false);
    const isValidate = checkValidate(task);
    if (isValidate) {
      // them task vao todoArr
      todoArr.push(task);
      //luu vao localStorage
      saveToStorage("todoArr", todoArr);
      renderTodoList(todoArr);
      // reset lai form input
    }
    inputTitle.value = "";
  });
  // validate task
  function checkValidate(task) {
    let isValidate = true;
    if (task.title.trim().length === 0) {
      alert("Please input title");
      isValidate = false;
    }
    return isValidate;
  }

  // ham hien thi task done
  function toggleTask() {
    document.querySelectorAll("#todo-list li").forEach(function (li) {
      li.addEventListener("click", function (e) {
        if (e.target !== li.children[0]) {
          // toggle checked
          li.classList.toggle("checked");
          //tim task vua click
          const taskClicked = todoArr.find(
            (taskItem) =>
              taskItem.owner === currentUser.username &&
              taskItem.title === li.textContent.slice(0, -1)
            // console.log(li.textContent)
          );
          // console.log(taskClicked);
          // thay doi thuoc tinh isDone
          taskClicked.isDone = li.classList.contains("checked") ? true : false;
          // save lai
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }
  // ham xoa task
  function deleteTask() {
    document.querySelectorAll("#todo-list .close").forEach(function (close) {
      close.addEventListener("click", function (e) {
        if (confirm("Are you sure?")) {
          // tim vi tri task muon xoa
          const indexToDelete = todoArr.findIndex(
            (taskItem) =>
              taskItem.owner === currentUser.username &&
              taskItem.title === close.parentElement.textContent.slice(0, -1)
          );
          // xoa task ra khoi todoArr
          todoArr.splice(indexToDelete, 1);
          // save lai
          saveToStorage("todoArr", todoArr);

          renderTodoList(todoArr);
        }
      });
    });
  }
  // ham show task
  function renderTodoList(todoArr) {
    let html = "";
    //todoList of user dang login
    todoArr
      .filter((task) => task.owner === currentUser.username)
      .forEach(function (task) {
        html += `<ul id="todo-list">
      <li class=${task.isDone ? "checked" : ""}>${
          task.title
        }<span class="close">×</span></li>
    </ul>`;
      });
    todoList.innerHTML = html;

    toggleTask();
    deleteTask();
  }
} else {
  alert("Please login to access this page");
  window.location.href = "../pages/login.html";
}
const arr = [0, 1, 2, 3];
