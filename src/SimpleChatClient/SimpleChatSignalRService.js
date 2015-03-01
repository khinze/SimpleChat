angular.module('SimpleChat')
	.factory('SimpleChatSignalRService', function($rootScope, Hub, simpleChatSignalrUrl){

		var hub = new Hub('ChatHub', {
	        listeners:{
	            'RaiseEvent': function (result) {
	                $rootScope.$broadcast(result.Type, result.Body);
	            }
	        },
	        methods: ['SubscribeUser', 'SendMessageToUser'],
	        rootPath: simpleChatSignalrUrl,
	        errorHandler: function(error){
	            console.error(error);
	        },
	    });

		var subscribeUser = function (nickName) {
		    hub.SubscribeUser(nickName); 
   		};		

   		var sendMessageToUser = function (userId, message) {
		    hub.SendMessageToUser(userId, message); 
   		};		    

     	return {
     		SubscribeUser: function(nickName){
				return subscribeUser(nickName);
     		},
     		SendMessageToUser: function(userId, message){
     			return sendMessageToUser(userId, message);
     		}
     	};
	});