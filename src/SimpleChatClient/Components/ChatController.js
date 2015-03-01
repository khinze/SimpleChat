angular.module('SimpleChat')
	.controller('ChatController', function($scope, $rootScope, SimpleChatSignalRService, notificationService){

		$scope.Chats = [];

		$scope.$on('ChatReceived', function(event, result){
			$scope.Chats.push(result);
			$scope.$apply();
		});	
		
		$scope.AreUsersPresent = false;

		$scope.SelectedUser = {
			Id: '',
			NickName: ''
		};

		$scope.$on('UserSelected', function(event, user){
			$scope.AreUsersPresent = true;
			$scope.SelectedUser = user;
		});

		$scope.$on('UsersReceived', function(event, users){
			$scope.AreUsersPresent = $scope.AreOtherUsersPresent(users);

			if($scope.AreUsersPresent){
				$scope.SetCurrentUser(users);
			}
		});

		$scope.$on('UserSubscribed', function(event, user){
			if(!$scope.AreUsersPresent && !$scope.IsCurrentUser(user.NickName)){
				$scope.AreUsersPresent = true;
				$scope.SelectedUser = user;
				$scope.$apply();
			}
		});	

		$scope.SetCurrentUser = function(users){
			$scope.AreUsersPresent = true;
			var user = users[0];

			if($scope.IsCurrentUser(user.NickName)){
				$scope.SelectedUser = users[1];
			}else{
				$scope.SelectedUser = users[0];
			}
		};

		$scope.AreOtherUsersPresent = function(users){
			if(users.length == 1 || users.length == 0){
				return false;
			}
			return true;
		};

		$scope.IsCurrentUser = function(nickName){
			return nickName == $rootScope.NickName;
		}
	});