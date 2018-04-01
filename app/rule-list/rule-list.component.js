'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('ruleList').
  component('ruleList', {
    templateUrl: 'rule-list/rule-list.template.html',
    controller: function RuleListController($scope, $http) {
      var self = this;
      self.orderProp = 'REC_NO';

      $http.get('http://localhost:3000/rules').then(function(response) {
		console.log('RuleListController',response.data);
        self.rules = response.data;
        $scope.rules = response.data;
          //Delete a person


      });

      $scope.editPerson = function (pId){
		  console.log(typeof pId);

        for (var i=0; i<$scope.rules.length;i++)
        {
			var rule = $scope.rules[i];
			console.log(rule);
			if (rule.REC_NO == pId)
			{
             $scope.newRule = {
              REC_TYPE: rule.REC_TYPE,
              SEARCH_WORD: rule.SEARCH_WORD,
              REPLACE_WORD: rule.REPLACE_WORD,
              NOTE: rule.NOTE,
              TABLE_NAME: rule.TABLE_NAME,
              COLUMN_DATA: rule.COLUMN_DATA,
              SOURCE: rule.SOURCE
			 }
			}
        }

      }

      $scope.deletePerson = function (pId) {
                //Defining $http service for deleting a person
                $http({
                    method: 'DELETE',
                    url: '/rules' + pId
                }).
                success(function (data) {
                    //Showing Success message
                    $scope.status = "The Person Deleted Successfully!!!";
                    //Loading people to the $scope
                    //GetPersons();
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to delete a person: ' + error.message;
                });
            }

      $scope.addNew = function(){
            $scope.rules.push({ 
                'rec_type': "", 
                'search_word': "",
                'replace_word': "",
                'note': "", 
                'table_name': "",
                'prov_name': "",
                'source': ""
            })};

  

            //Create a new person
            $scope.createPerson = function () {
                //Defining $http service for creating a person
                $http({
                    method: 'POST',
                    url: '/rules',
                    data: JSON.stringify($scope.rules),
                    headers: { 'Content-Type': 'application/JSON' }
                }).
                success(function (data) {
                    //Showing Success message
                    $scope.status = "The Person Saved Successfully!!!";
                    //Loading people to the $scope
                    GetPersons();
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to create a person: ' + error.message;
                });
            }

      $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.rules, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.rules = newDataList;
      };

    }




  })
  
;
