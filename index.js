const express = require('express');
const app = express();
const server = require('http').Server(app);

require('./startup')(app);
require('./startup/models')

server.listen(process.env.APPLICATION_PORT, async () => {
    const error = require('./middleware/v1/error');

    // services
    // await require('./services/v1/cache');

    // routes
    await require('./startup/routes')(app);

    app.use(error);
    console.log('listening on port: ', process.env.APPLICATION_PORT);
});