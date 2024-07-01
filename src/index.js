//src/undex.js

const setupServer = require('./server');
const initMongoConnection = require('./db/initMongoConnection')

async function startServer() {
    await initMongoConnection();
    setupServer();
}

startServer();
