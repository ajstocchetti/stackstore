'use strict'

app.config(function ($stateProvider) {
    $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'js/admin/admin-panel.html',
            controller: 'adminPanelCtrl',
            resolve: {
                users: function(AdminFactory){
                        // console.log('here I am');
                        return AdminFactory.getAllUsers()
                }
            }
        })

        
});