const todoList = require('../data/todos.json');

const findTodo = () => {
    return new Promise((resolve, reject) => {
        resolve(todoList)
    })
}

module.exports = {
    find: findTodo
}

