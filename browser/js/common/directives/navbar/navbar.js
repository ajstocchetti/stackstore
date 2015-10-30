app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Jawa Trader', state: 'home' },
                { label: 'Product List', state: 'productList'},
                { label: 'Account Management', state: 'accountMgmt', auth: "login" },
                { label: 'Admin Panel', state: 'admin-panel', auth: "admin" }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.isAdmin = function () {
              return AuthService.isAdminUser();
            }

            scope.hasAuth = function(auth) {
              if(auth=="login")
                return this.isLoggedIn();
              else if(auth=="admin")
                return this.isAdmin();
              return true
            }


            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
