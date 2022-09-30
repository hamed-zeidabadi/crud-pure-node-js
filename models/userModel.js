const userList = require('../data/users.json');
const { writeData } = require('../fs');


const findAllUser = () => {
    return new Promise((resolve, reject) => {
        resolve(userList);
    })
}

const findUser = (username) => {
    return new Promise((resolve, reject) => {
        const user = userList.find((p) => p.username === username);
        resolve(user);
    })
}
const findUserByID = (id) => {
    return new Promise((resolve, reject) => {
        const user = userList.find((p) => p.id === id);
        resolve(user);
    })
}

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const newUser = { id: String(userList.length + 1), ...user }
        userList.push(newUser)
        writeData('./data/users.json', userList);
        resolve(newUser)
    })
}



module.exports = {
    findAll: findAllUser, find: findUserByID, findUser: findUser, create: createUser
}