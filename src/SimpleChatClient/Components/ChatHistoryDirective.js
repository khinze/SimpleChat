angular.module('SimpleChat')
	.directive('chatHistory', function(){
		return {
             restrict: 'E',
             priority: 0,
             templateUrl: 'Components/ChatHistory.html',
             controller: 'ChatHistoryController',
             scope: {
                    user: '=',
                    chats: '='
             }
         }
	});