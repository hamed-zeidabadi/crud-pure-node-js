const todoList = require('../data/todos.json');
const { writeData } = require('../fs');


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

const create = (todo) => {
    return new Promise((resolve, reject) => {
        const newTodo = { id: String(todoList.length + 1), ...todo }
        todoList.push(newTodo)
        writeData('./data/todos.json', todoList);
        resolve(newTodo)
    })
}

const update = (id, todo) => {
    return new Promise((resolve, reject) => {
        const idx = todoList.findIndex((p) => p.id === id);
        todoList[idx] = { id, ...todo }
        writeData('./data/todos.json', todoList);
        resolve(todoList[idx])
    })
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        const newTodoList = todoList.filter((p) => p.id !== id);
        writeData('./data/todos.json', newTodoList);
        resolve()
    })
}


module.exports = {
    findAll, findByID, create, update, remove
}