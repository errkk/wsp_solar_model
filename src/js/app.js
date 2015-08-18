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
            abstract: true,
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
        })
        .state('app.orientation', {
            url: "o/:orientation/d/:datetime",
            views: {
                'model': {
                    templateUrl: 'templates/model-view.html',
                    controller: 'ModelCtrl'
                }
            }
        });

        $urlRouterProvider.otherwise('/o/top/d/2015-01-01+00:00:00');
    });
