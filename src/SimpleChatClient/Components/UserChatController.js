angular.module('SimpleChat')
	.controller('UserChatController', function($scope, SimpleChatSignalRService, notificationService){

		$scope.Message = '';

		$scope.SendMessageToUser = function(){
			SimpleChatSignalRService.SendMessageToUser($scope.user.Id, $scope.Message);
			notificationService.success('Your message has been sent to ' + $scope.user.NickName);
		};

	});