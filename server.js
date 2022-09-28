const http = require('http');
const { getAllTodo, getTodoById } = require('./controllers/todoController');

const server = http.createServer((req, res) => {
    if (req.url === '/api/todo' && req.method === 'GET') {
        getAllTodo(req, res)
        console.log('all');

    } else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        console.log('by id', id);
        getTodoById(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running on ${PORT}`));