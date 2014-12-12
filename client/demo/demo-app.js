angular.module('omnigrahm', ['ngAutocomplete'])
  .controller('AppController', function ($scope, $timeout, $http) {
    $scope.activeClasss = 'not-active';
    $scope.init = function () {
      $timeout(function () {
        $scope.activeClasss = 'active';
      }, 500);
      return $http.get('/api/instagram')
        .then(function (res) {
          $timeout(function () {
            window.setHappiness(res.data.cities);
          }, 200);
        });
    };
  })
  .controller('FormController', function ($scope, $http) {
    $scope.fieldText = '';
    $scope.currentCity = null;
    $scope.cities = {
      country: 'us',
      types: '(cities)'
    };

    $scope.$watch(function () {
      return $scope.currentCity;
    }, function () {
      if ($scope.currentCity !== null) {
        $http.get('/api/instagram/' + $scope.currentCity.placeId)
          .then(function (res) {
            var name = $scope.currentCity.name;
            var lat = $scope.currentCity.geometry.location.lat();
            var lon = $scope.currentCity.geometry.location.lng();
            var positive = Math.random() * 50;
            var negative = Math.random() * 50;
            addSingleCity(name, lat, lon, positive, negative);
          });
      }
    });

    $scope.submitForm = function () {
      if ($scope.currentCity !== null) {
        setTimeout(function () {
          // console.log('Adding ', $scope.currentCity.name);
        }, 100);
      }
    };
  });