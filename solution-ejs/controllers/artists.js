var db = require('../models');
var Artist = db.models.Artist;
var Song = db.models.Song;

function index(req, res) {
	Artist.findAll().then(function(artists) {
		res.render("artists/index", {artists: artists});
	});
}

function show(req, res) {
  Artist.findById(req.params.id, {
    //Return all songs that have a matching artistId
    include: Song
  })
  .then(function(artist){
    if(!artist) return error(res, "not found");
    //Artist.sing();
    //artist.shout();
    res.render("artists/show", {artist: artist});
  });	
}

function newArtist(req, res) {
	res.render("artists/new");
}

function create(req, res) {
	Artist.create(req.body).then(function(artist){
    res.redirect("/artists/" + artist.id);
  });
}

function edit(req, res) {
  Artist.findById(req.params.id).then(function(artist){
    if(!artist) return error(res, "not found");
    res.render("artists/edit", {artist: artist});
  });  
}

function update(req, res) {
  Artist.findById(req.params.id)
  .then(function(artist){
    if(!artist) return error(res, "not found");
    return artist.updateAttributes(req.body);
  })
  .then(function(artist){
    res.render("artists/show", {artist: artist});
  });
}

function destroy(req, res) {
  Artist.findById(req.params.id)
  .then(function(artist){
    if(!artist) return error(res, "not found");
    return artist.destroy();
  })
  .then(function(){
    res.redirect("/artists");
  });  
}

module.exports.index = index;
module.exports.show = show;
module.exports.newArtist = newArtist;
module.exports.create = create;
module.exports.edit = edit;
module.exports.update = update;
module.exports.destroy = destroy;