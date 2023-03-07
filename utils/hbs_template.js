// setup template engine directory and files extensions
const setupTemplateEngine = () => {
    const express = require('express')
    const app = express()
    const path = require('path')
    // add template engine
    const hbs = require('express-handlebars');
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    app.engine('hbs', hbs.engine({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: __dirname + '/views/layouts/',
    }))
}

module.exports = setupTemplateEngine
