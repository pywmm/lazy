const createServer = require('../src/server2');

createServer('desktop', process.env.ISDOCKERIZED ? 3100 : 3000);
