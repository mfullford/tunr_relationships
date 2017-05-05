angular.module("tunrApp")
	.controller("ManagerIndexController", ManagerIndexController)
	.controller("ManagerShowController", ManagerShowController)
	.controller("ManagerNewController", ManagerNewController)
	.controller("ManagerEditController", ManagerEditController);

ManagerIndexController.$inject = ["$http"];
function ManagerIndexController($http) {
	var vm = this;
	vm.deleteManager = deleteManager;

	function getAllManagers() {
		$http.get('/api/managers')
			.then(function(response) {
				vm.allManagers = response.data;
			});		
	}

	function deleteManager(manager) {
		$http.delete('/api/managers/'+manager.id)
			.then(function(response) {
				var managerIndex = vm.allManagers.indexOf(manager);
				vm.allManagers.splice(managerIndex, 1);
			});
	}

	getAllManagers();
}

ManagerShowController.$inject = ["$http", "$routeParams"];
function ManagerShowController($http, $routeParams) {
	var vm = this;
	
	function getOneManager() {
		$http.get('/api/managers/'+$routeParams.id)
			.then(function(response) {
				vm.oneManager = response.data;
			});			
	}

	getOneManager();
}

ManagerNewController.$inject = ["$http", "$location"];
function ManagerNewController($http, $location) {
	var vm = this;
	vm.saveManager = saveManager;

	function saveManager() {
		$http.post('/api/managers/', vm.newManager)
			.then(function(response) {
				var manager = response.data;
				$location.path("/managers/" + manager.id);
			});		
	}

}

ManagerEditController.$inject = ["$http", "$routeParams", "$location"];
function ManagerEditController($http, $routeParams, $location) {
	var vm = this;
	vm.updateManager = updateManager;

	function getManager() {
		$http.get('/api/managers/'+$routeParams.id)
			.then(function(response) {
				vm.updatedManager = response.data;
			});			
	}

	function updateManager() {
		$http.put('/api/managers/'+$routeParams.id, vm.updatedManager)
			.then(function(response) {
				var manager = response.data;
				$location.path("/managers/" + manager.id);
			});			
	}

	getManager();
}