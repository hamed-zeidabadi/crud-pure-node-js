const todoList = require('../data/todos.json');

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(todoList);
    })
}

const findByID = (id) => {
    return new Promise((resolve, reject) => {
        const todo = todoList.find((p) => p.id === id);
        resolve(todo);
    })
}

module.exports = {
    findAll, findByID
}