angular.module('SimpleChat')
.factory('jsonService', ['$http', '$rootScope', function($http, $rootScope){
             
          var ajax = function(apiUrl, httpMethod, url, requestData){
              return $http({
                  method: httpMethod,
                  url: apiUrl + url,
                  data: requestData
              });
          };
          
          return{
                 Get: function(apiUrl, restMethod, parameters){
                    return ajax(apiUrl, "GET", restMethod, parameters);
                 },
                 Put: function(apiUrl, restMethod, data){
                    return ajax(apiUrl, "PUT", restMethod, data);    
                 },
                 Post: function(apiUrl, restMethod, data){
                    return ajax(apiUrl, "POST", restMethod, data);    
                 },
                 Delete: function(apiUrl, restMethod, data){
                    return ajax(apiUrl, "DELETE", restMethod, data);    
                 }
          };        
      }])
	.factory('SimpleChatJsonService', function($rootScope, simpleChatApiUrl, jsonService){

	    return{
                 Get: function(restMethod, parameters){
                    return jsonService.Get(simpleChatApiUrl, restMethod, parameters);
                 },
                 Put: function(restMethod, data){
                    return jsonService.Put(simpleChatApiUrl, restMethod, data);    
                 },
                 Post: function(restMethod, data){
                    return jsonService.Post(simpleChatApiUrl, restMethod, data);    
                 },
                 Delete: function(restMethod, data){
                    return jsonService.Delete(simpleChatApiUrl, restMethod, data);    
                 }
          };  
	})
	.factory('SimpleChatApiService', function(SimpleChatJsonService){

		return {
        GetUsers: function(){
          var route = 'Users';

          return SimpleChatJsonService.Get(route, null);
        }
		}
	});