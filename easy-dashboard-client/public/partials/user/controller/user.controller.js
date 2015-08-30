(function () {
    'use strict';
    var user = angular.module('app.user');

    user.controller("LoginCtrl", ['$scope', '$state', 'AuthenticationService', function ($scope, $state, AuthenticationService) {
        $scope.hasError = false;
        $scope.login = function () {
            AuthenticationService.Login($scope.email, $scope.password, function (response) {
                if (response.id == 0) {
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
                $scope.selected = null;
            });
        }
    }]);

    user.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'row', function ($scope, $modalInstance, row) {
        $scope.row = row;

        $scope.ok = function () {
            $modalInstance.close($scope.row);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);


    user.controller('UserReportController', function ($scope) {
        $scope.data =   {
            // ID of the element in which to draw the chart.
            element: 'test',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: [
                { year: '2008', value: 20 },
                { year: '2009', value: 10 },
                { year: '2010', value: 5 },
                { year: '2011', value: 5 },
                { year: '2012', value: 20 }
            ],
            // The name of the data record attribute that contains x-values.
            xkey: 'year',
            // A list of names of data record attributes that contain y-values.
            ykeys: ['value'],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels: ['Value']
        }
    });


    user.run(function ($templateCache, $http) {
        $http.get('messages.html')
            .then(function (response) {
                $templateCache.put('error-messages', response.data);
            })
    })
})();