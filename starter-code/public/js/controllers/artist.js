angular.module("tunrApp")
	.controller("ArtistIndexController", ArtistIndexController)
	.controller("ArtistShowController", ArtistShowController)
	.controller("ArtistNewController", ArtistNewController)
	.controller("ArtistEditController", ArtistEditController);

ArtistIndexController.$inject = ["$http"];
function ArtistIndexController($http) {
	var vm = this;
	vm.deleteArtist = deleteArtist;

	function getAllArtists() {
		$http.get('/api/artists')
			.then(function(response) {
				vm.allArtists = response.data;
			});		
	}

	function deleteArtist(artist) {
		$http.delete('/api/artists/'+artist.id)
			.then(function(response) {
				var artistIndex = vm.allArtists.indexOf(artist);
				vm.allArtists.splice(artistIndex, 1);
			});
	}

	getAllArtists();
}

ArtistShowController.$inject = ["$http", "$routeParams"];
function ArtistShowController($http, $routeParams) {
	var vm = this;
	
	function getOneArtist() {
		console.log($routeParams.id);
		$http.get('/api/artists/'+$routeParams.id)
			.then(function(response) {
				console.log(response);
				vm.oneArtist = response.data;
			});			
	}

	getOneArtist();
}

ArtistNewController.$inject = ["$http", "$location"];
function ArtistNewController($http, $location) {
	var vm = this;
	vm.saveArtist = saveArtist;

	function saveArtist() {
		console.log(vm.newArtist);
		$http.post('/api/artists/', vm.newArtist)
			.then(function(response) {
				var artist = response.data;
				$location.path("/artists/" + artist.id);
			});		
	}

}

ArtistEditController.$inject = ["$http", "$routeParams", "$location"];
function ArtistEditController($http, $routeParams, $location) {
	var vm = this;
	vm.updateArtist = updateArtist;

	function getArtist() {
		console.log($routeParams.id);
		$http.get('/api/artists/'+$routeParams.id)
			.then(function(response) {
				console.log(response);
				vm.updatedArtist = response.data;
			});			
	}

	function updateArtist() {
		$http.put('/api/artists/'+$routeParams.id, vm.updatedArtist)
			.then(function(response) {
				var artist = response.data;
				$location.path("/artists/" + artist.id);
			});			
	}

	getArtist();
}