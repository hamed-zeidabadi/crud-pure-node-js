const Todo = require('./../models/todoModel');


const getAllTodo = async (req, res) => {
    try {
        const allTodo = await Todo.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.send(JSON.stringify(allTodo))
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    getAllTodo
}