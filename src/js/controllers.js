angular.module('wsp.app.controllers', [])

    .controller('GraphCtrl', function($scope) {
        console.log('GraphCtrl');
    })

    .controller('ModelCtrl', function($scope, $stateParams, $state) {
        console.log('ModelCtrl');
        $scope.$on("$stateChangeSuccess", function() {
            $scope.datetime = new Date($state.params.datetime.replace('+', ' '));
        });
        $scope.$state = $state;
    });

