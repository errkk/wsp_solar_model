angular.module('wsp.app.controllers', [])

    .controller('GraphCtrl', function($scope) {
        console.log('GraphCtrl');
    })

    .controller('ModelCtrl', function($scope, $stateParams) {
        console.log('ModelCtrl');
        $scope.datetime = new Date();
        $scope.axis = 'camera';
    });

