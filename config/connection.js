const { connect, connection } = require('mongoose');
//connects to or creates database in mongo compass
connect('mongodb://127.0.0.1:27017/socialDB');

module.exports = connection;