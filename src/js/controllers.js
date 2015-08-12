angular.module('wsp.app.controllers', [])

    .controller('GraphCtrl', function($scope) {
        console.log('GraphCtrl');
    })

    .controller('ModelCtrl', function($scope, $stateParams, $state) {
        console.log('ModelCtrl');
        $scope.datetime = new Date();
        $scope.$state = $state;
    });

