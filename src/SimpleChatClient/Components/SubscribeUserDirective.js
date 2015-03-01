angular.module('SimpleChat')
	.directive('subscribeUser', function(){
		return {
             restrict: 'E',
             priority: 0,
             templateUrl: 'Components/SubscribeUser.html',
             controller: 'SubscribeUserController'
         }
	});
