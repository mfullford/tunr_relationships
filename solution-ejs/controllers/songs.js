var db = require('../models');
var Song = db.models.Song;

function index(req, res) {
	Song.findAll().then(function(songs) {
		res.render("songs/index", {songs: songs});
	});
}

function show(req, res) {
  Song.findById(req.params.id)
  .then(function(song){
    if(!song) return error(res, "not found");
    res.render("songs/show", {song: song});
  });	
}

function newSong(req, res) {
	res.render("songs/new");
}

function create(req, res) {
	Song.create(req.body).then(function(song){
    res.redirect("/songs/" + song.id);
  });
}

function edit(req, res) {
  Song.findById(req.params.id).then(function(song){
    if(!song) return error(res, "not found");
    res.render("songs/edit", {song: song});
  });  
}

function update(req, res) {
  Song.findById(req.params.id)
  .then(function(song){
    if(!song) return error(res, "not found");
    return song.updateAttributes(req.body);
  })
  .then(function(song){
    res.render("songs/show", {song: song});
  });
}

function destroy(req, res) {
  Song.findById(req.params.id)
  .then(function(song){
    if(!song) return error(res, "not found");
    return song.destroy();
  })
  .then(function(){
    res.redirect("/songs");
  });  
}

module.exports.index = index;
module.exports.show = show;
module.exports.newSong = newSong;
module.exports.create = create;
module.exports.edit = edit;
module.exports.update = update;
module.exports.destroy = destroy;