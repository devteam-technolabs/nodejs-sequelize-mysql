const express = require('express');
const routes = express.Router();
const fs = require('fs').promises
const path = require('path')

async function walk(dir, fileList = []) {
    const files = await fs.readdir(dir)
    for (const file of files) {
        const stat = await fs.stat(path.join(dir, file))
        if (stat.isDirectory()) fileList = await walk(path.join(dir, file), fileList)
        else fileList.push(path.join(dir, file))
    }
    return fileList
}

module.exports = async function (app) {
    let allFiles = await walk('./resources/v1')
    allFiles.forEach(file => {
        if (file.indexOf('route') > -1) {
            let fileNameArray = file.split('.')[0];
            let routeName = fileNameArray.split('/')[3];
            console.log('registering route: ', routeName);
            routes.use(`/${routeName}`, require(`../${fileNameArray}.routes`));
        }
    });

    app.get('/', function (req, res, next) {
        return res.status(200).send({
            msg: 'everything is working fine.',
            host: req.get('host'),
        })
    });

    app.use('/api/v1', routes);

    app.route('*').all((req, res) => {
        return res.status(404).send({
            msg: `'${req.originalUrl}' is not a invalid endpoint. please check the request URL and try again.`
        })
    })
}