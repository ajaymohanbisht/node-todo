var Twitter = require('twitter-node-client').Twitter;

exports.twitterSearchByHashtag = function(){

    //Callback functions
    var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);
        
    };

	var config = {
	    "consumerKey": "fCZly354iCImUtuJGFrwpe3QR",
	    "consumerSecret": "86sL6fPcxPDKVhqbdBHEOZyj1ZN6SYLVyAshEeTQrzN6g0ouGO",
	    "accessToken": "3221048078-fEKnLyNSlutpFWGty3t9wO4OoW5PZq6x7BQGJD8",
	    "accessTokenSecret": "hoICREpeKe8YPVaOf8knlD0nBcCD5OzLmMYwmnyXai2rJ",
	    "callBackUrl": "XXX"
	}
	var twitter = new Twitter(config);
	//console.log(twitter);
	//twitter.getSearch({'q':'#LiveForMore','count': 10}, error, success);

	twitter.getCustomApiCall('/trends/place.json', {id : 1}, error, success);

	//twitter.getUser({screen_name: 'shailender2015'}, error, success);
}
