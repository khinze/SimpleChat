angular.module('SimpleChat')
	.directive('userChat', function(){
		return {
             restrict: 'E',
             priority: 0,
             templateUrl: 'Components/UserChat.html',
             controller: 'UserChatController',
             scope: {
                    user: '=',
             }
         }
	});