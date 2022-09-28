const http = require('http');
const { getAllTodo, getTodoById, createTodo, updateTodoById, deleteTodoById } = require('./controllers/todoController');


const server = http.createServer((req, res) => {
    if (req.url === '/api/todo' && req.method === 'GET') {
        getAllTodo(req, res);

    } else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getTodoById(req, res, id);
    } else if (req.url === '/api/todo' && req.method === 'POST') {
        createTodo(req, res);
    } else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateTodoById(req, res, id);
    } else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteTodoById(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running on ${PORT}`));