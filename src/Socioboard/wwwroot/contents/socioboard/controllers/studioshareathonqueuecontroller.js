'use strict';

SocioboardApp.controller('StudioShareathonQueueController', function ($rootScope, $scope, $http, $timeout, apiDomain) {
    //alert('helo');
    $scope.$on('$viewContentLoaded', function() {   
        $scope.query = {};
        $scope.queryBy = '$';
        studio_shareathon_que();



        $scope.deleteshareathon = function (profileId) {
            swal({
                title: "Are you sure?",
                text: "You will not be able to send any message via this account!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
	        function () {
	            //todo: code to delete profile
	            $http.post(apiDomain + '/api/ContentStudio/DeleteShareathon?PageShareathodId=' + profileId)
                            .then(function (response) {
                                if (response.data == "success") {
                                    swal("Deleted!", "Your profile has been deleted.", "success");
                                    $scope.loadpageshareathon();
                                }
                            }, function (reason) {
                                $scope.error = reason.data;
                            });
	        });
        }


        $scope.loadpageshareathon = function () {

            //codes to get  page shreathon
            $http.get(apiDomain + '/api/ContentStudio/UserpageShareathon?userId=' + $rootScope.user.Id)
                              .then(function (response) {
                                  $scope.shareathonData = response.data;
                              }, function (reason) {
                                  $scope.error = reason.data;
                              });
            // end codes to get page shreathon
        }
  


        $scope.editpageshareathon = function () {
            $('#PageShareathonModal').openModal();
        }


        $scope.shareathonQueue = function () {
            $http.get(apiDomain + '/api/ContentStudio/ShareathonQueue?userId=' + $rootScope.user.Id)
                           .then(function (response) {
                               $scope.shareathonData = response.data;

                               console.log($scope.shareathonData);

                           }, function (reason) {
                               $scope.error = reason.data;
                     });
        }

        $scope.shareathonQueue();

  });

});