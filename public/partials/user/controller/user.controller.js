(function () {
    'use strict';
    var user = angular.module('app.user');

    user.controller("LoginCtrl", ['$scope', '$state', 'AuthenticationService', function ($scope, $state, AuthenticationService) {
        $scope.hasError = false;
        $scope.login = function () {
            AuthenticationService.Login($scope.email, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.email, $scope.password);
                    $state.transitionTo('home');
                    $scope.hasError = false;
                } else {
                    $scope.hasError = true;
                }
            })
        }

    }]);


    user.controller("RegistrationCtrl", ["$scope", "$state", function ($scope, $state) {
    }]);


    user.controller("UserManagementCtrl", ["$scope", "UserService", "$state", "$modal", function ($scope, UserService, $state, $modal) {
        UserService.GetAll().then(function (users) {
            $scope.users = users;
        });

        $scope.openDetails = function(row){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'useDetails.modal.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    row: function () {
                        return row;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }]);

    user.controller('ModalInstanceCtrl', function ($scope, $modalInstance, row) {
        $scope.row = row;

        $scope.ok = function () {
            $modalInstance.close($scope.row);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

    user.run(function ($templateCache, $http) {
        $http.get('messages.html')
            .then(function (response) {
                $templateCache.put('error-messages', response.data);
            })
    })
})();