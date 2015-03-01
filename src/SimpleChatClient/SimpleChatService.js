angular.module('SimpleChat')
	.factory('SimpleChatService', function($rootScope, Hub, simpleChatSignalrUrl){

		$rootScope.NickName = '';
		
     	return {
     		GetNickName: function(){
				return $rootScope.NickName;
     		},
     		SetNickName: function(nickName){
     			 $rootScope.NickName = nickName;
     		},
     		IsNickNameEqual: function(nickName){
     			if($rootScope.NickName == nickName)
     				return true;
     			return false;
     		}
     	};
	});