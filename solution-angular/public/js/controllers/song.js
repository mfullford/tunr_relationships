angular.module("tunrApp")
	.controller("SongIndexController", SongIndexController)
	.controller("SongShowController", SongShowController)
	.controller("SongNewController", SongNewController)
	.controller("SongEditController", SongEditController);

SongIndexController.$inject = ["$http"];
function SongIndexController($http) {
	var vm = this;
	vm.deleteSong = deleteSong;

	function getAllSongs() {
		$http.get('/api/songs')
			.then(function(response) {
				vm.allSongs = response.data;
			});		
	}

	function deleteSong(song) {
		$http.delete('/api/songs/'+song.id)
			.then(function(response) {
				var songIndex = vm.allSongs.indexOf(song);
				vm.allSongs.splice(songIndex, 1);
			});
	}

	getAllSongs();
}

SongShowController.$inject = ["$http", "$routeParams"];
function SongShowController($http, $routeParams) {
	var vm = this;
	
	function getOneSong() {
		$http.get('/api/songs/'+$routeParams.id)
			.then(function(response) {
				vm.oneSong = response.data;
			});			
	}

	getOneSong();
}

SongNewController.$inject = ["$http", "$location"];
function SongNewController($http, $location) {
	var vm = this;
	vm.saveSong = saveSong;

	function saveSong() {
		$http.post('/api/songs/', vm.newSong)
			.then(function(response) {
				var song = response.data;
				$location.path("/songs/" + song.id);
			});		
	}

}

SongEditController.$inject = ["$http", "$routeParams", "$location"];
function SongEditController($http, $routeParams, $location) {
	var vm = this;
	vm.updateSong = updateSong;

	function getSong() {
		$http.get('/api/songs/'+$routeParams.id)
			.then(function(response) {
				vm.updatedSong = response.data;
			});			
	}

	function updateSong() {
		$http.put('/api/songs/'+$routeParams.id, vm.updatedSong)
			.then(function(response) {
				var song = response.data;
				$location.path("/songs/" + song.id);
			});			
	}

	getSong();
}