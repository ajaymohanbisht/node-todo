exports.todoSample = function(){
	var inputMessageArraydata = [
	"First #First msg @Ajay",
	"@Nalin #Second msg",
	"aaa #First aaa mgs",
	"abc Second #Third msg",
	"abc Third abc #Fourth",
	"#Fifth Second def msg",
	"#Sixth First xyz msg",
	"bbb First bbb msg",
	"lmn First lmn msg",
	"#Seventh Second lmn msg"
	]
	
	   
    var uniqueTopicArray = [];
    var uniqueUserArray = [];
    var uniqueMsgArray = [];

    for (var i=0; i<inputMessageArraydata.length; i++){
    	var splitArray = inputMessageArraydata[i].split(" ");
    	var hashIdentifier = /^#/;
    	var atTheRateIdentifier = "@";
    	var isTopic = false;

    	for(var j=0; j<splitArray.length; j++){
			if(hashIdentifier.exec(splitArray[j])){
				uniqueTopicArray.push(splitArray[j]);
				
			}
			else if(splitArray[j].charAt(0) == atTheRateIdentifier){
				uniqueUserArray.push(splitArray[j]);
				
			}isTopic = true;
		};
		if(isTopic) {
			uniqueMsgArray.push(inputMessageArraydata[i]);
		}
	}


	console.log("Topic ===>",uniqueTopicArray);

	console.log("User ===>",uniqueUserArray);
	console.log("Messages ===>",uniqueMsgArray);

}
