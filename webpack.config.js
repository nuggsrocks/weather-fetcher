const path = require('path');

module.exports = {
    entry: path.join(__dirname + 'front-end' + 'src' + 'index.js'),
    output: {
        path: path.join(__dirname + 'front-end' + 'public'),
        filename: 'bundle.js'
    }
}