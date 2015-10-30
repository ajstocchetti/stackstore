app.config(function ($stateProvider) {

    $stateProvider.state('accountMgmt', {
        url: '/manage-account',
        templateUrl: '/js/accountmgmt/accountOverview.html',
        resolve: {
          me: function(AccountFactory) {
            return AccountFactory.me()
          },
          orders: function(AccountFactory) {
            return AccountFactory.myOrders();
          }
        },
        controller: function ($scope, me, orders) {
            $scope.me = me;
            $scope.orders = orders;
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});
