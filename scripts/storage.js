"use strict";

//save data
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// get data
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//lay data userArr tu localStorage
const KEY = "userArr";
const users = getFromStorage(KEY) ? getFromStorage(KEY) : [];
const tasks = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
//chuyen user tu js object ve dang class instance
const userArr = users.map((user) => parseUser(user));
//chuyen task tu js object ve dang class instance
const todoArr = tasks.map((task) => parseTask(task));

const currentUser = getFromStorage("currentUser");

//ham chuyen tu js Object sang class instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );

  return user;
}

function parseTask(taskData) {
  const task = new Task(taskData.title, taskData.owner, taskData.isDone);

  return task;
}
