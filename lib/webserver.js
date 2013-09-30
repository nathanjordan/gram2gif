var express = require('express');
var underscore = require('underscore');
var async = require('async');
var swig = require('swig');
var path = require('path');

var app = express();

var VIEWS_ROOT = path.resolve(__dirname, '..', 'views');
var STATIC_ROOT = path.resolve(__dirname, '..', 'static');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', VIEWS_ROOT);

app.get('/', function(req, res) {
    res.render('index', { });
});

app.use(express.static(STATIC_ROOT));

app.listen(8080);
