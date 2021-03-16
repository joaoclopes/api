const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/encurtador', (req, res) => {
    res.render('encurtador')
});

app.use('/post-link', (req,  res) => {
    axios.post('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' + process.env.LINK_KEY, {
            "longDynamicLink": "https://testeencurtador.page.link/?link="+req.body.link,
            "suffix": {
                "option": "UNGUESSABLE"
            }
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error)
        });
});

module.exports = app;