var express = require('express');
var underscore = require('underscore');
var async = require('async');
var swig = require('swig');
var path = require('path');
var request = require('request');
var url = require('url');

var INSTAGRAM_AUTH_URL = 'https://api.instagram.com/oauth/authorize/';
var INSTAGRAM_TOKEN_URL = 'https://api.instagram.com/oauth/access_token';
var INSTAGRAM_CLIENT_ID = '3310ff91e56e44beb1ccc81ac738b30f';
var INSTAGRAM_CLIENT_SECRET = '68874e3854d74c95a1821d860f0c8eeb';
var INSTAGRAM_REDIRECT_URI = 'http://gram2gif.com:8080/auth';
var INSTAGRAM_WEBSITE_URL = 'http://gram2gif.com:8080';

var VIEWS_ROOT = path.resolve(__dirname, '..', 'views');
var STATIC_ROOT = path.resolve(__dirname, '..', 'static');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', VIEWS_ROOT);

app.get('/', function(req, res) {
    res.render('index', { });
});

app.get('/auth', function(req) {
   if (req.query['code']) {
	var form = {
	    client_id: INSTAGRAM_CLIENT_ID,
	    client_secret: INSTAGRAM_CLIENT_SECRET,
	    grant_type: 'authorization_code',
	    redirect_uri: INSTAGRAM_REDIRECT_URI,
	    code: req.query.code 
	};
	request.post({ url: INSTAGRAM_TOKEN_URL, form: form }, function(err, res, body) {
		console.log(body);;	
	});
   } else if (req.query['error']) {

   }
});

app.use(express.static(STATIC_ROOT));

app.listen(8080);
