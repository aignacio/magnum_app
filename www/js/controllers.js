angular.module('app.controllers', [])
.controller('pageCtrl', ['$scope','$q','$http', '$stateParams', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q,$http, $stateParams, $timeout) {
  var defer = $q.defer();
  $scope.acel = '0';

  $scope.acel_click = function(){
    $scope.acel = document.getElementById("acelerador").value;
    console.log("Acelerador:"+$scope.acel);
    $http({method: 'GET',
         url: 'http://192.168.4.1/motor',
         params: {com : $scope.acel},
         config: { timeout : defer.promise }
       }).
    then(function(response) {
      console.log(response);
      $scope.debug = response;
    }, function(response) {
      $scope.data = response.data || "Request failed";
      $scope.status = response.status;
      console.log($scope.status);
    });
  };

  var esq_interval = null,
      dir_interval = null;

  $scope.esquerda_send = function(){
    esquerda_inc();
  };

  function esquerda_inc(){
    console.log("Virar a esquerda...");
    esq_interval = $timeout(esquerda_inc, 30);
    $http({method: 'GET',
         url: 'http://192.168.4.1/motor',
         params: {com : 'esquerda'}
       }).
    then(function(response) {
      console.log(response);
      $scope.debug = response;
    }, function(response) {
      $scope.data = response.data || "Request failed";
      $scope.status = response.status;
      console.log($scope.status);
    });
  }

  $scope.parar_esquerda = function(){
    $timeout.cancel(esq_interval);
  };


  $scope.direita_send = function(){
    direita_inc();
  };

  function direita_inc(){
    console.log("Virar a direita...");
    dir_interval = $timeout(direita_inc, 30);
    $http({method: 'GET',
         url: 'http://192.168.4.1/motor',
         params: {com : 'direita'}
       }).
    then(function(response) {
      console.log(response);
      $scope.debug = response;
    }, function(response) {
      $scope.data = response.data || "Request failed";
      $scope.status = response.status;
      console.log($scope.status);
    });
  }

  $scope.parar_direita = function(){
    $timeout.cancel(dir_interval);
  };
}])
