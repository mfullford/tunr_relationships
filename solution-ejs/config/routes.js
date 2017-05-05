var express = require('express');
var router = express.Router();
var artistsController = require('../controllers/artists.js');
var managersController = require('../controllers/managers.js');
var songsController = require('../controllers/songs.js');

//Main Routes

router.get('/', function(req, res) {
  res.render('home');
});

router.get('/about', function(req, res) {
  res.render('about');
});

//Artist Routes
  
// index
router.get('/artists', artistsController.index);

// new
router.get('/artists/new', artistsController.newArtist);

// create
router.post('/artists', artistsController.create);

// show
router.get('/artists/:id', artistsController.show);

// edit
router.get('/artists/:id/edit', artistsController.edit);

// update
router.put('/artists/:id', artistsController.update);

// destroy
router.post('/artists/:id/delete', artistsController.destroy);

//Manager Routes
  
// index
router.get('/managers', managersController.index);

// new
router.get('/managers/new', managersController.newManager);

// create
router.post('/managers', managersController.create);

// show
router.get('/managers/:id', managersController.show);

// edit
router.get('/managers/:id/edit', managersController.edit);

// update
router.put('/managers/:id', managersController.update);

// destroy
router.post('/managers/:id/delete', managersController.destroy);

//Song Routes
  
// index
router.get('/songs', songsController.index);

// new
router.get('/songs/new', songsController.newSong);

// create
router.post('/songs', songsController.create);

// show
router.get('/songs/:id', songsController.show);

// edit
router.get('/songs/:id/edit', songsController.edit);

// update
router.put('/songs/:id', songsController.update);

// destroy
router.post('/songs/:id/delete', songsController.destroy);

module.exports = router;