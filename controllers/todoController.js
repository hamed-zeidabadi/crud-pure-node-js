const Todo = require('./../models/todoModel');


const getAllTodo = async (req, res) => {
    try {
        const allTodo = await Todo.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(allTodo))
    } catch (error) {
        console.log(error);
    }
}

const getTodoById = async (req, res, id) => {
    try {
        const todo = await Todo.findByID(id);
        console.log('todo:', todo);
        if (!todo) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Todo Not Found !' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(todo))
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllTodo, getTodoById
}