angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			searchByHashtag : function (searchQuery) {
				console.log("S E R V I C E..", searchQuery);

				return $http.post('/search/twitter/', searchQuery);
			},
			topTrendingTopics :  function () {
				return $http.get('/search/twitter/trend/');
			}
		}
	}]);