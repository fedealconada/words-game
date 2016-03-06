(function () {
  /*jshint latedef: nofunc */
  'use strict';

  angular

    .module('wordsApp')
    .service('IPService', IPService) ;

    function IPService($http) {

        this.getIp = function() {
          return $http.get('https://api.ipify.org?format=json', { cache: true });
        };

    }

})();

