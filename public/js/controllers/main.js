angular.module('todoController', ['ngRoute'])
	
	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http', '$routeParams','Todos', function($scope, $http, $routeParams, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				
				//$scope.todos = data;
				
				$scope.loading = false;

				$scope.getTodoApplicationData(data);
			});

		$scope.errorMsg = false;
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				var hashIdRegex = /^#\w*\d*|\s(#\w*\d*)/;
				var todoMessage = $scope.formData.text;
				if(hashIdRegex.exec(todoMessage) !== null && typeof hashIdRegex.exec(todoMessage) === "object" ){
					console.log(" # present");
				
				
					$scope.loading = true;
					console.log($scope.formData.date);

					// call the create function from our service (returns a promise object)
					Todos.create($scope.formData)

						// if successful creation, call our get function to get all the new todos
						.success(function(data) {
							$scope.loading = false;
							$scope.formData = {}; // clear the form so our user is ready to enter another
							
							//$scope.todos = data; // assign our new list of todos

							$scope.getTodoApplicationData(data);

						});
				}
				else{
					/*console.log("# not present");
					$scope.errorMsg = true;
*/
					$('#error').show().delay(2000).fadeOut('slow');
					/*setTimeout( function() {
						console.log("# reset present");
						$scope.errorMsg = false;				
					},1500);*/
				}

			}
		};

		// DELETE ========================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;
			console.log(id);

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					console.log("DELETED.....");
					$scope.loading = false;

					//$scope.todos = data; // assign our new list of todos

					$scope.getTodoApplicationData(data);


				});
		};

		// Get TOPIC Messages ==============================================================
		$scope.getTopicMsg = function(topic){
			console.log("Topic (getTopicMsg)",topic);

			Todos.get()
				.success(function(data) {
					$scope.todos = data;
					$scope.loading = false;

				    var topicWithMessages = [];
				    for(var i=0; i<data.length; i++){
				    	console.log(data[i].text);
						if(data[i].text.indexOf(topic.title) !== -1){
							topicWithMessages.push(data[i]);	
						}
					}
				console.log("topicMessages", topicWithMessages);
				$scope.messages = topicWithMessages;	
				$scope.eventType = "TOPIC";
			});
		};

		// Get USER Messages ==============================================================


		$scope.getUserMsg = function(userId){
			console.log("User (getUserMsg)", userId.user);
			
			Todos.get()
				.success(function(data) {
					$scope.todos = data;
					$scope.loading = false;

					var userWithMessages = [];

				    for(var i=0; i < data.length; i++){
				    	console.log(data[i].text);

						if(data[i].text.indexOf(userId.user) !== -1){
							userWithMessages.push(data[i]);	
						}
					}
					console.log("userMessages", userWithMessages);	
					
					$scope.messages = userWithMessages;
					$scope.eventType = "USER";
				});
		};


		// SEARCH Twitter Topics ========================================================================

		$scope.searchTwitterTopics = function(){

			var searchTopic = $scope.formData.searchTerm;
			console.log("search for....", searchTopic)

			Todos.searchByHashtag($scope.formData)
				.success(function(data) {
					
					var parseSearchResults = JSON.parse(data);
					console.log(data);
					$scope.searchResults = parseSearchResults.statuses;
					console.log($scope.searchResults);
					$scope.loading = false;
				});
		}


		// Twitter Trends ================================================================================

		$scope.topTwitterTrends = function(){

			Todos.topTrendingTopics()
				.success(function(data){
					var parseTrendsResult  = JSON.parse(data);
					console.log(parseTrendsResult);
					$scope.trendsResults = parseTrendsResult[0].trends;
					console.log($scope.trendsResults);
					$scope.loading = false;
				});
		}


		// Common function
		$scope.getTodoApplicationData = function(todosData) {
			var topicListArray = [];
			var userListArray = [];
			var uniqueMsgArray = [];
			var topicArray = [];
			var userArray = [];
			var msgArray = [];
			var hashIdentifier = /^#\w*\d*|\s(#\w*\d*)/;
			var atTheRateIdentifier = /^@\w*\d*|\s(@\w*\d*)/;

			var data = todosData;
			// Step 1: Find unique Topics, Users and Messages
			for(var i = 0; i < data.length; i++){
				uniqueMsgArray.push(data[i]);
				topicArray.push(hashIdentifier.exec(data[i].text));
				userArray.push(atTheRateIdentifier.exec(data[i].text));
			}		

			for(var i in topicArray) {
				if (typeof topicArray[i] !== "undefined" && topicArray[i] !== null) {
					topicListArray.push(topicArray[i][0]);
				}
			};
			for(var i in userArray) {
				if (typeof userArray[i] !== "undefined" && userArray[i] !== null) {
					userListArray.push(userArray[i][0]);
				}
			};

			//Step 2: 
			var uniqueTopicArray = topicListArray.filter(function(elem, pos) {
			    return topicListArray.indexOf(elem) == pos;
			 }); 
			var uniqueUserArray = userListArray.filter(function(elem, pos) {
			    return userListArray.indexOf(elem) == pos;
			 });						

			console.log("Topic ===>",uniqueTopicArray);
			console.log("User ===>",uniqueUserArray);
			console.log("Messages ===>",uniqueMsgArray);

			//Step 3: Create JSON For Topic
			var allTopicJSON = [];
			var currentTopicJSON = {};
			for (var a=0; a < uniqueTopicArray.length; a++) {
				currentTopicJSON["title"] = uniqueTopicArray[a];
				var topicJSON = [];
				for (var i=0; i<uniqueMsgArray.length; i++) {
					if(uniqueMsgArray[i].text.indexOf(uniqueTopicArray[a]) !== -1) {
						topicJSON.push(uniqueMsgArray[i]);
					}
				}
				currentTopicJSON["messages"] = topicJSON;
				console.log("====>" , currentTopicJSON);
				allTopicJSON.push(currentTopicJSON);
				currentTopicJSON = {};
			}
			console.log( JSON.stringify(allTopicJSON) );
			
			//Step 4: Create JSON For User
			var allUserJSON = [];
			var currentUserJSON = {};
			for (var a=0; a < uniqueUserArray.length; a++) {
				currentUserJSON["user"] = uniqueUserArray[a];
				var userJSON = [];
				for (var i=0; i<uniqueMsgArray.length; i++) {
					if(uniqueMsgArray[i].text.indexOf(uniqueUserArray[a]) !== -1) {
						userJSON.push(uniqueMsgArray[i]);
					}
				}
				currentUserJSON["messages"] = userJSON;
				console.log("====>" , currentUserJSON);
				allUserJSON.push(currentUserJSON);
				currentUserJSON = {};
			}
			console.log( JSON.stringify(allUserJSON) );

			$scope.messages = uniqueMsgArray;
			$scope.topics = allTopicJSON;	
			$scope.users = allUserJSON;		
		};

	}]);




