(function () {
  'use strict';
  /*jshint latedef: nofunc */

  angular

    .module('wordsApp')
    .service('DataService', DataService) ;

    function DataService($firebaseObject, $q) {

        var defered = $q.defer();
        var ref = new Firebase("https://blazing-fire-7864.firebaseio.com");

        this.ref = ref;

        this.getData = function() {

          $firebaseObject(ref).$loaded()
          .then(function(data) {
            defered.resolve(data);
          })
          .catch(function(error) {
            console.error("Error:", error);
          });

          return defered.promise;
        };

        this.updateData = function(bestScores){
          this.ref.update({highscores: bestScores});
          return defered.promise;
        };

    }

})();

