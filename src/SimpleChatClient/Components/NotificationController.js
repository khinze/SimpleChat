angular.module('SimpleChat')
	.controller('NotificationController', function($scope, notificationService){

		$scope.$on('UserSubscribed', function(event, result){
			notificationService.success(result.NickName + ' is now online.');
		});	
	});