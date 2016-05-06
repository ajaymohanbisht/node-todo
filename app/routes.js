var Todo = require('./models/todo');
var Twitter = require('twitter-node-client').Twitter;
var config = require('../config/twitter'); 			// load the database config
var Tweet = require('./models/tweet');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

function getTwitterData(req, res){

	var topicName = req.body.searchTerm;

	console.log("getTwitterData..", topicName);
	
	var twitterConfig = {
		"consumerKey": config.consumerKey ,
		"consumerSecret": config.consumerSecret,
		"accessToken": config.accessToken,
		"accessTokenSecret": config.accessTokenSecret,
		"callBackUrl": config.callBackUrl
	}

	var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
        res.json(err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);

        var parseTweets = JSON.parse(data);
        var tweeterData = parseTweets.statuses;
        var tweetSource = topicName;
        for(var i=0; i<tweeterData.length; i++){

        	var tweetData = tweeterData[i].text;
        	console.log("tweetData===>", tweetData);
        	Tweet.create({
        	source: tweetSource,
        	tweet : tweetData

        	}, function(err, tweet) {
			if (err)
				console.log("tweet records not saved");

        	});
       	}
        
        // var tweetHashtag = [];
        // var tweetHandle = [];
        // var hashRegex = new RegExp(/^#\w*\d*|\s(#\w*\d*)/);
        // var atTheRateRegex = new RegExp(/^@\w*\d*|\s(@\w*\d*)/);
        // tweetHashtag = tweetData.match(hashRegex);
        // tweetHandle = tweetData.match(atTheRateRegex);


        res.json(data);

    };

	var twitter = new Twitter(twitterConfig);

	twitter.getSearch({'q':topicName,'count': 2}, error, success);
};


function getTwitterTrendsData(req, res){

	// var topicName = req.body.searchTerm;
	// console.log("getTwitterData..", topicName);
	
	var twitterConfig = {
		"consumerKey": config.consumerKey ,
		"consumerSecret": config.consumerSecret,
		"accessToken": config.accessToken,
		"accessTokenSecret": config.accessTokenSecret,
		"callBackUrl": config.callBackUrl
	}

	var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
        res.json(err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);
        res.json(data);
    };

	var twitter = new Twitter(twitterConfig);
	twitter.getCustomApiCall('/trends/place.json', {id : 1}, error, success);
};


module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
		console.log(req.body.text, req.body.date);
		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			createddate : new Date(),
			duedate : req.body.date,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err) {
				console.log(err);
				res.send(err);
			}

			getTodos(res);
		});
	});

	//--------------TWITTER API Calls ----------------------------
	app.post('/search/twitter/', function(req, res) {

		console.log("/search/twitter/:topicname..", req.body.searchTerm);

		// use Twitter to get Hashtags based on Search Parameter
		getTwitterData(req, res);

	});
	app.get('/search/twitter/trend', function(req, res) {

		// use Twitter to get Hashtags based on Search Parameter
				//getTodos(res);
				getTwitterTrendsData(req, res);

	});

	

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};