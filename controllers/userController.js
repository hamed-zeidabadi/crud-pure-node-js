const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');
const getAllUser = async (req, res) => {
    try {
        const allUser = await User.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(allUser))
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (req, res, id) => {
    try {
        const user = await User.findByID(id);
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found !' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        }
    } catch (error) {
        console.log(error);
    }
}
const createUser = async (req, res) => {
    try {
        let body = '';
        req.on('data', (c) => {
            body += c.toString();
        })

        req.on('end', async () => {
            const { username, password } = JSON.parse(body)
            const hashPassword = await bcrypt.hashSync(password, 10);
            const newUser = { username, password: hashPassword }
            const createUser = await User.create(newUser)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(createUser))
        })


    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    getAllUser,
    getUserById,
    createUser
}