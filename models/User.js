"use strict";
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    category = "sports",
    pageSize = 5
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;

    this.category = category;
    this.pageSize = pageSize;
  }
}
class Task {
  constructor(title, owner, isDone) {
    this.title = title;
    this.owner = owner;
    this.isDone = isDone;
  }
}
