(function () {
  'use strict';
  /*jshint latedef: nofunc */

  angular

    .module('wordsApp')
    .controller('GameController', GameController) ;


    function GameController($scope, $rootScope, $firebaseObject, $state, $timeout, $http, DataService, IPService) {

      var vm = this ;

      vm.loader = true;
      vm.maxTime = 40;
      vm.initialize = initialize ;
      vm.runGame = runGame ;
      vm.onKeyUp = onKeyUp ;
      vm.timerOff = timerOff ;
      var user = $state.params.user;

      function initialize() {

        vm.username = user.username;

        if (!user.ip){
          IPService.getIp().then(function(response) {
            vm.ip = response.data.ip;
          });
        }else{
          vm.ip = user.ip;
        }

        DataService.getData().then(function(data) {
          vm.words = data.words.slice();
          vm.highscores = data.highscores || null;
          vm.loader = false;

          if (vm.words) {
            vm.runGame();
          }
          else {
            vm.errorMessage = "Oops! This is embarrasing. There was an error when retrieving the list of words.";
          }
        });

      }

      function runGame() {

        vm.score = 0;
        vm.remainingTime = vm.maxTime;
        vm.charsInput = '';
        $rootScope.$broadcast('update-progress', { remaining: 100} ) ;

        timerOn();
        nextWord();
      }

      function onKeyUp(e) {

        var input = e.target.value.toLowerCase();
        // For each character that was deleted whilst entering. The word -1 is subtracted from the score
        if (vm.tmpScore > 0 && e.keyCode === 8) {
          vm.tmpScore -= 1;
        }
        if (input === vm.solution) {

          if (vm.tmpScore) {
            vm.score += vm.tmpScore;
          }
          nextWord();
        }
      }

      function timerOff(locate) {

        $timeout.cancel(vm.timer);
        $state.go(locate);
      }


      /* Helpers function */
      function timerOn() {
        //if run out of time
        if (vm.remainingTime < 1) {
          $timeout.cancel(vm.timer);
          updateHighscores();
        } else {
          vm.timer = $timeout(function(){
            vm.remainingTime--;
            //updating progress bar as long as the time runs
            $rootScope.$broadcast('update-progress', { remaining: vm.remainingTime} ) ;
            timerOn();
          }, 1000);
        }
      }

      function updateHighscores(){
        //if highscore is not empty
        if(vm.highscores){

          var highscores = vm.highscores;
          var bestScores = highscores.slice()
            .sort(function(i,j){
              return j.score - i.score;
            }).
            map(function(data){
              var obj = {};
              obj.username = data.username;
              obj.score = data.score;
              obj.ip = data.ip;
              return obj;
            });
          // If there is a new score --> update
          if (vm.score > _.first(bestScores).score) {
            if (bestScores.length >= 10) {
              bestScores.shift();
              vm.highscores.shift();
            }
            var current = {
              username: vm.username || "Anonymous",
              ip: vm.ip || 'unknown',
              score: vm.score
            };
            var user = _.findWhere(bestScores, {ip: vm.ip});
            //if new player
            if (typeof user !== 'undefined') {
              if (vm.score > user.score) {
                //remove old score
                bestScores = _.without(bestScores, _.findWhere(bestScores, {ip: vm.ip}));
              }
            }
            bestScores.push(current);
            DataService.updateData(bestScores).then(function success() {
              vm.highscores.push(current);
            });
          }
          $state.go('highscores');

        } else {
          var obj = {};
          obj.username = vm.username || "Anonymous";
          obj.ip = vm.ip;
          obj.score = vm.score;
          DataService.ref.child("highscores").set([obj]);
          $state.go('highscores');
        }
      }

      function shuffle(word) {
        return _.shuffle(word).join("");
      }

      function nextWord() {
        // get random word from array
        var word = vm.words[Math.floor(Math.random() * vm.words.length)];
        // get index of that word
        var idx = vm.words.indexOf(word);
        //remove word from array
        vm.words.splice(idx, 1);

        //there are words in the array
        if (word){
          vm.solution = word.toLowerCase();
          var n  = vm.solution.length;
          var max = Math.floor(Math.pow(1.95,(n/3)));

          vm.tmpScore = (max === 0)?1:max;
          vm.charsInput = '';
          vm.mangledWord = shuffle(vm.solution).split('');
        }
        else {
          $timeout.cancel(vm.timer);
          updateHighscores();
        }

      }

  }

})();
