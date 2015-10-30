app.controller('UserDetailCtrl', function($scope, UserFactory, orders, user){
	$scope.orders = orders;
    $scope.user = user;

    $scope.passwordReset = function(id){
        UserFactory.resetPassword(id)
            .then(function(){
                $scope.messages = "Password reset"
            })
            .catch(function(err){
                $scope.messages = 'There was an error processing your submission.';
                console.log(err);
        });
    };

    $scope.toggleAdmin = function(id){
        UserFactory.toggleAdmin(id)
            .then(function(updatedUser){
                $scope.user = updatedUser
                $scope.messages = "Admin Rights Changed"
            })
            .catch(function(err){
                $scope.messages = 'There was an error processing your submission.';
                console.log(err);
            });
    };




});
