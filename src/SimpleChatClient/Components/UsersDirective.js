angular.module('SimpleChat')
	.directive('users', function(){
		return {
             restrict: 'E',
             priority: 0,
             templateUrl: 'Components/Users.html',
             controller: 'UsersController'
         }
	});
