/*exports.world = function() {
  console.log('Hello World');
}*/

exports.todoSample = function() {

	var inputMessagesArray = [
		"#abc First abc msg",
		"#def First def msg",
		"aaa First aaa mgs",
		"#abc Second abc msg",
		"#abc Third abc msg",
		"#def Second def msg",
		"#xyz First xyz msg",
		"bbb First bbb msg",
		"#lmn First lmn msg",
		"#lmn Second lmn msg"
	]
	//console.log(arr1);

	var topicIdentifier = "#";
    var uniqueTopicArray = []; 
    //Step 1 : Identify messages with #
	for(var i=0; i<inputMessagesArray.length; i++) {
		if(inputMessagesArray[i].substr(0,1) == topicIdentifier) {
			uniqueTopicArray.push(inputMessagesArray[i]);
		}
	}
	console.log( uniqueTopicArray );

	//Step 2 : Fetch Unique Topics 
	var topicTitle = [];
	for(var i=0; i<uniqueTopicArray.length; i++) {
    	var splitMsgArray = uniqueTopicArray[i].split(" ");
	    if(topicTitle.indexOf(splitMsgArray[0]) < 0) {
			topicTitle.push(splitMsgArray[0]);
    	}
	}
	console.log( topicTitle );

	//Step 3: Create JSON
	var allTopicJSON = [];
	var currentTopicJSON = {};
	for (var a=0; a < topicTitle.length; a++) {
		currentTopicJSON["title"] = topicTitle[a];
		var topicJSON = [];
		for (var i=0; i<uniqueTopicArray.length; i++) {
			if(uniqueTopicArray[i].indexOf(topicTitle[a]) !== -1) {
				topicJSON.push(uniqueTopicArray[i]);
			}
		}
		currentTopicJSON["messages"] = topicJSON;
		console.log("====>" , currentTopicJSON);
		allTopicJSON.push(currentTopicJSON);
		currentTopicJSON = {};
	}
	console.log( JSON.stringify(allTopicJSON) );

}