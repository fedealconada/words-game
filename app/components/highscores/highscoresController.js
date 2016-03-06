(function () {
  'use strict';
  /*jshint latedef: nofunc */

  angular

    .module('wordsApp')
    .controller('HighScoresController', HighScoresController) ;

	function HighScoresController($scope, $firebaseObject, DataService) {

		var vm = this ;

    	DataService.getData().then(function(data){
      		vm.highscores = data.highscores;
    	});
    }

})();
