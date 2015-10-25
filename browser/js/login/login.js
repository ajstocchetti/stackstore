app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, SignupFactory, $state) {

    $scope.login = {};
    $scope.signup = {};
    $scope.error = null;
    $scope.signupError = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function (result) {
            if (result && result.message === "reset") {
              console.log("reset needed");
              console.log(result);
              $state.go('resetPassword', { email: result.data });
            } else {
              $state.go('home');
            }
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

    $scope.sendSignup = function(userInfo) {
      $scope.signupError = null;

      SignupFactory.create(userInfo).then(function(errMsg) {
        if(errMsg == "valid") {
          AuthService.login(userInfo).then(function () {
              $state.go('home');
          })
      } else {
          $scope.signupError = errMsg;
        }
      })
    }

});
