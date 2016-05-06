exports.todoSample = function(){
	var inputMessageArraydata = [
	"First #First msg @Ajay",
	"@Nalin #Second msg",
	"aaa First aaa mgs",
	"abc Second #Third msg",
	"abc Third abc #Fourth",
	"#Fifth Second def msg",
	"#Sixth First xyz msg",
	"bbb First bbb msg",
	"lmn First lmn msg",
	"#Seventh Second lmn msg"
	]
	
	var topicWithMessages = [];   
    var topicListArray = [];
    var userListArray = [];
    var msgListArray = [];
    var topicArray = [];
    var userArray = [];
    var msgArray = [];
    var hashIdentifier = /^#\w*|\s(#\w*\d*)/;
    var atTheRateIdentifier = /^@\w*|\s(@\w*\d*)/;

    	for(var i=0; i<inputMessageArraydata.length; i++){
				topicArray.push(hashIdentifier.exec(inputMessageArraydata[i]));
				userArray.push(atTheRateIdentifier.exec(inputMessageArraydata[i]));
			}		
		for(var i in topicArray) {
			if (typeof topicArray[i] !== "undefined" && topicArray[i] !== null) {
				topicListArray.push(topicArray[i][0]);
				msgListArray.push(topicArray[i].input);
			}
		};
		for(var i in userArray) {
			if (typeof userArray[i] !== "undefined" && userArray[i] !== null) {
				userListArray.push(userArray[i][0]);
			}
		};

	console.log("Topic ===>",topicListArray);
	console.log("User ===>",userListArray);
	console.log("Messages ===>",msgListArray);
}
