angular.module('wsp.app', [
       'ngAnimate',
       'ui.router',
       'wsp.app.services',
       'wsp.app.controllers',
       'wsp.app.directives'
       ])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            resolve: {
            },
            url: "/",
            views: {
                'graph': {
                    templateUrl: 'templates/graph-view.html',
                    controller: 'GraphCtrl'
                },
                'model': {
                    templateUrl: 'templates/model-view.html',
                    controller: 'ModelCtrl'
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    });
