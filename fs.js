const fs = require('fs');

const writeData = (fileName, content) => {
    fs.writeFileSync(fileName, JSON.stringify(content, 'utf8', (error) => {
        if (error) {
            console.log(error);
        }
    }))
};

module.exports = {
    writeData
}