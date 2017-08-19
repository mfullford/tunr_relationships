import { db } from '../models';
var Song = db.models.Song;

function index(req, res) {
	Song.findAll().then(function(songs) {
		res.json(songs);
	});
}

function show(req, res) {
  Song.findById(req.params.id)
  .then(function(song){
    if(!song) res.send(res, "not found");
    else res.json(song);
  });	
}

function create(req, res) {
	Song.create(req.body).then(function(song){
    if(!song) res.send(res, "not saved");
    else res.json(song);
  });
}

function update(req, res) {
  Song.findById(req.params.id)
  .then(function(song){
    if(!song) res.send(res, "not found");
    else return song.updateAttributes(req.body);
  })
  .then(function(song){
    res.json(song);
  });
}

function destroy(req, res) {
  Song.findById(req.params.id)
  .then(function(song){
    if(!song) res.send(res, "not found");
    else return song.destroy();
  })
  .then(function(){
    res.redirect(303, "/songs");
  });  
}

const songsController = <any>{};
songsController.index = index;
songsController.show = show;
songsController.create = create;
songsController.update = update;
songsController.destroy = destroy;

export {songsController};