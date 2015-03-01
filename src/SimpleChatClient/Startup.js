
angular.module('SimpleChat', []);

angular
  .module('Application', [
    'ngRoute',
    'SimpleChat',
    'ui.notify',
    'SignalR',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $httpProvider, $provide) {
         
      $routeProvider
        .when('/', {
          templateUrl: 'Components/Home.html',
          controller: 'HomeController'
        })
        .when('/Chat', {
          templateUrl: 'Components/Chat.html',
          controller: 'ChatController'
        })
        .otherwise({
          redirectTo: '/'
        });
      
       $provide.factory('httpInterceptor', function ($q, $window, $rootScope, $location) {
           
                return {
                    // On request success
                    request: function (config) {

                        return config || $q.when(config);
                    },

                    // On request failure
                    requestError: function (rejection) {
                        
                        // Return the promise rejection to be consume downstream
                        return $q.reject(rejection);
                    },

                    // On response success
                    response: function (response) {
                      
                        return response || $q.when(response);
                    },

                    // On response failure
                    responseError: function (rejection) {
                     
                        return $q.reject(rejection);
                    }
                };
            });

            $httpProvider.interceptors.push('httpInterceptor');
    
  })
.run(function ($location, $window, $rootScope) {

});
