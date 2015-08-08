angular.module('wsp.app', [
       'ngAnimate',
       'ui.router'
       ])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            resolve: {
            },
            abstract: true,
            url: "/",
            views: {
                'slide': {
                    template: '<ui-view class="Slide-container--parent" />',
                    controller: 'SlideCtrl'
                }
            }
        });
    });
