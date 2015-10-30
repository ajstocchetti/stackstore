app.config(function ($stateProvider) {

    $stateProvider.state('accountMgmt', {
        url: '/manage-account',
        templateUrl: '/js/accountmgmt/accountOverview.html',
        resolve: {
          me: function(AccountFactory) {
            return AccountFactory.me()
            // .then(function(me) {
            //   return me
            // })
          }
        },
        controller: function ($scope, me) {
            $scope.me = me;
            $scope.asdf = "asdf";
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});
