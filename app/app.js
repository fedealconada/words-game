(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name wordsApp
   * @description
   * # wordsApp
   *
   * Main module of the application.
   */
  angular
    .module('wordsApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngTouch',
      'ui.router',
      'firebase',
    ])

    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider

        .state('home', {
          url: "/home",
          templateUrl: "components/home/home.html",
          controller: 'HomeController',
          controllerAs: 'vm'
        })
        .state('game', {
          url: "/game",
          templateUrl: "components/game/game.html",
          controller: 'GameController',
          controllerAs: 'vm',
          params: {user:null}
        })
        .state('instructions', {
          url: "/instructions",
          templateUrl: "components/instructions/instructions.html",
        })
        .state('highscores', {
          url: "/highscores",
          templateUrl: "components/highscores/highscores.html",
          controller: 'HighScoresController',
          controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise("/home");
    });

})();

