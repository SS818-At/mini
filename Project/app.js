var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {

  var cleanAccount = function() {
    var account = {
      name: 'Bob Jones',
      startingBalace: 100.00,
      runningBalance: 73.34
    }
    return account;
  };
  
   var cleanTransaction = function() {
    var transaction = {
		id: 0 ,
	
      type: 'debit',
      amount: 0.00,
	  	description: ''
      
    }

    return transaction;
  };

  var transactions = [{
	  id: 1 ,
	  date: '12/06/2020',
    amount: 100.00,
	
    description: 'Alain',
    type: 'retrait' ,
	agence: 'wafacash'
  }, {
	  id: 2 ,
	  date: '12/07/2020',
    amount: 50.00,
    description: 'Michelle',
	
    type: 'versement' ,
	agence: 'westernUnion'
  }, {
	  id: 3 ,
	  date: '12/08/2020',
	  
    amount: 25.26,
    description: 'Souad',
    type: 'versement' ,
	agence: 'wafacash'
  }, {
	  id: 4 ,
	  date: '12/05/2020',
    amount: 100.00,
    description: 'Asmae',
	
    type: 'retrait' ,
	agence: 'wafacash'
  }, {
	  id: 5 ,
	  date: '12/04/2020',
    amount: 35.15,
    description: 'Hiba',
    type: 'versement' ,
	agence: 'westernUnion'
	
  }, {
	  id: 6 ,
	  date: '12/03/2020',
    amount: 16.25,
    description: 'Jean',
    type: 'versement' ,
	agence: 'wafacash'
  }, ];

 

  $scope.transaction = cleanTransaction();
  $scope.account = cleanAccount();

  $scope.transactionList = transactions;

  $scope.saveTransaction = function() {
    var amount = parseFloat($scope.transaction.amount);
    var num = parseFloat($scope.account.runningBalance);
    var answer = 0;
    if ($scope.transaction.type === 'credit') {
      answer = num + amount
    } else {
      answer = num - amount
    }
    $scope.account.runningBalance = answer;

    $scope.transaction.amount = amount;
    transactions.push($scope.transaction);
    $scope.transaction = cleanTransaction();
  };
  
          $scope.Delete = function (index) {
            // Remove first / oldest element from history if it reaches maximum capacity of 10 records
                $scope.transaction.shift();
            // Add deleted record to historical records
            $scope.transactionList.push($scope.transaction[index]);

            // Remove from main records (using index)
            $scope.transaction.splice(index, 1);
        };
 

});


app.directive('moneywarn', function() {
  var staticWarningLevel = .2;

  return {
    restrict: 'A',
    scope: {
      val: '=moneywarn'
    },
    link: function(scope, element, attrs) {
      scope.$watch('val', function(newValue) {
        var startBalance = parseInt(attrs.startbalance);
        var warningLevel = startBalance * staticWarningLevel;
        if (newValue === warningLevel) {
          element.addClass('alert-warning');
           element.removeClass('alert-danger');
        } else if (newValue < warningLevel) {
          element.addClass('alert-danger');
        } else {
          element.removeClass('alert-warning');
          element.removeClass('alert-danger');
        }

      }, true);
    }
  }

});