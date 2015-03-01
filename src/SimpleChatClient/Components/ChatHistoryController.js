angular.module('SimpleChat')
	.controller('ChatHistoryController', function($scope, $rootScope, notificationService){

		$scope.IsAnyChatsAvailable = function(){
			for(var i=0; i<$scope.chats.length; i++){
				if($scope.DisplayChat($scope.chats[i])){
					return true;
				}
			}
			return false;
		}

		$scope.DisplayChat = function(chat){
			if(chat.ToNickName == $rootScope.NickName && chat.FromNickName == $scope.user.NickName){
				return true;
			}
			if(chat.ToNickName == $scope.user.NickName && chat.FromNickName == $rootScope.NickName){
				return true;
			}
			return false;
		}
	});