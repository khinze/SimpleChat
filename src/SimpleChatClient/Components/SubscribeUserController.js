angular.module('SimpleChat')
	.controller('SubscribeUserController', function($scope, $location, SimpleChatSignalRService, notificationService, SimpleChatService){

		$scope.NickName = '';

		$scope.SubscribeUser = function(){
			SimpleChatService.SetNickName($scope.NickName);
			SimpleChatSignalRService.SubscribeUser($scope.NickName);
			$location.path('/Chat');
		}
	});