app.controller('ProductAddCtrl', function ($scope, AdminFactory, $state) {



    $scope.submit = function (form) {
        // Trigger validation flag.
        $scope.submitted = true;

        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        // Default values for the request.
        var config = {
            'name': $scope.newName,
            'price': $scope.newPrice,
            'capacity': $scope.newCapacity,
            'manufacturer': $scope.newMan,
            'image': [$scope.newImage],
            'description': $scope.newDescription,
            'type': $scope.newType,
            'weight': $scope.newWeight

        };

        AdminFactory.addNewProduct(config)
            .then(function (result) {
                $state.go('admin-panel');
                $scope.messages = 'New Product Added.';

            }).catch(function(err){
                $scope.messages = 'There was an error processing your submission.';
                console.log(err);
        })
    };
});

