const todoList = require("../data/todos.json");
const { writeData } = require("../fs");

//get all todo
const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(todoList);
  });
};
//find todo by id
const findByUserID = (id) => {
  return new Promise((resolve, reject) => {
    const todo = todoList.find((p) => p.user_id === id);
    resolve(todo);
  });
};

//create new todo
const create = (todo) => {
  return new Promise((resolve, reject) => {
    const newTodo = { id: String(todoList.length + 1), ...todo };
    todoList.push(newTodo);
    writeData("./data/todos.json", todoList);
    resolve(newTodo);
  });
};
//update todos by id
const update = (id, todo) => {
  return new Promise((resolve, reject) => {
    const idx = todoList.findIndex((p) => p.id === id);
    todoList[idx] = { id, ...todo };
    writeData("./data/todos.json", todoList);
    resolve(todoList[idx]);
  });
};

//remove todo by id
const remove = (id) => {
  return new Promise((resolve, reject) => {
    const newTodoList = todoList.filter((p) => p.id !== id);
    writeData("./data/todos.json", newTodoList);
    resolve();
  });
};

module.exports = {
  findAll,
  findByUserID,
  create,
  update,
  remove,
};
