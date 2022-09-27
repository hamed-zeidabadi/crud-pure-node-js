const Todo = require('./../models/todoModel');


const getAllTodo = async (req, res) => {
    try {
        const allTodo = await Todo.find()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(allTodo))
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllTodo
}