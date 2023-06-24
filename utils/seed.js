const connection = require('../config/connection');
const { User } = require('../models');
const { users } = require('./data');
// seeds data base with users
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    let userCheck = await connection.db.listCollections({name: 'users'}).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    await User.collection.insertMany(users);
    

    console.table(users);
    
    console.info('Seeding completed! 👩‍🌾');
    process.exit(0);
});