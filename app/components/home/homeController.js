(function () {
  'use strict';
  /*jshint latedef: nofunc */

  angular

    .module('wordsApp')
    .controller('HomeController', HomeController) ;


    function HomeController($scope, $firebaseObject, $state, $http, DataService, IPService) {

      var vm = this ;
      vm.loader = true ;
      vm.username = null;
      vm.formData = {} ;
      vm.start = start ;
      var user ;

      //get user IP
      IPService.getIp().then(function(response) {
          var ip = response.data.ip;

          DataService.getData().then(function(response){
            vm.highscores = response.highscores;
            if (vm.highscores){
              user = _.find(vm.highscores, function(item) {
                if (item)
                  return item.ip === ip;
              });
            }
            console.log(user);
            if (user){
              vm.username = user.username;
            }
            vm.loader = false;
          });

        }, function error(response) {
          console.log(response);
          vm.loader = false;
        });

      function start() {
        if (user){
          $state.go('game', { user: user });
        }else{
          user = {};
          user.username = vm.formData.username || "Anonymous";
          $state.go('game', { user: user });
        }
      }
    }
})();

