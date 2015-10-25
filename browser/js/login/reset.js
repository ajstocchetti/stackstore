// State for reset password page
app.config(function ($stateProvider) {
    $stateProvider
        .state('resetPassword', {
            url: '/reset',
            templateUrl: '/js/login/reset.html',
            controller: 'ResetCtrl',
            resolve: {
              userEmail: function($stateParams) {
                return $stateParams.email
              }
            }
        })
});

app.controller('ResetCtrl', function($scope, userEmail, AuthService, $state) {
  $scope.error = null;
  $scope.reset = {};

  // If password  is reset successfully, then log them in
  $scope.sendReset = function(credentials){
    AuthService.resetPassword(credentials)
    .then(function() {
      return AuthService.login(credentials)
    })
    .then(function() {
      $state.go('home')
    })
    .catch(function() {
      $scope.error = "Invalid login credentials"
    })
  };


});
