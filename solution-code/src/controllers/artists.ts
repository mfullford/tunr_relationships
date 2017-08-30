import { db } from '../models';
var Artist = db.models.Artist;
var Song = db.models.Song;

function index(req, res) {
	Artist.findAll().then(function(artists) {
		res.json(artists);
	});
}

function show(req, res) {
  Artist.findById(req.params.id, {
    include: Song
  })
  .then(function(artist){
    if(!artist) res.send(res, "not found");
    //Artist.sing();
    //artist.shout();
    else res.json(artist);
  });	
}

function create(req, res) {
	Artist.create(req.body).then(function(artist){
    if(!artist) res.send(res, "not saved");
    else res.json(artist);
  });
}

function update(req, res) {
  Artist.findById(req.params.id)
  .then(function(artist){
    if(!artist) res.send(res, "not found");
    else return artist.updateAttributes(req.body);
  })
  .then(function(artist){
    res.json(artist);
  });
}

function destroy(req, res) {
  Artist.findById(req.params.id)
  .then(function(artist){
    if(!artist) res.send(res, "not found");
    else return artist.destroy();
  })
  .then(function(){
    res.redirect(303, "/artists");
  });  
}

const artistsController = <any>{};
artistsController.index = index;
artistsController.show = show;
artistsController.create = create;
artistsController.update = update;
artistsController.destroy = destroy;

export {artistsController};