(function () {
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('wordsApp')
    .directive('progressbarTimer', progressbarTimer);


  /* @ngInject */
  function progressbarTimer() {
    var directive = {
      bindToController: true,
      controller: progressbarTimerController,
      controllerAs: 'vm',
      templateUrl: "shared/directives/progressbarTimer/progressbarTimer.html",
      restrict: 'E',
      scope: {
        "maxTime": "=",
      }
    };
    return directive;

  }


  /* @ngInject */
  function progressbarTimerController($scope, $element) {
    var vm = this;
    vm.remainingTime = vm.maxTime;
    $scope.$on('update-progress', function(event, data) {
      vm.remainingTime = data.remaining;
      var percentage = ((data.remaining)*100)/vm.maxTime;
      $element.find('div').css('width', percentage+'%').attr('aria-valuenow', vm.remainingTime);
    });
  }

})();
