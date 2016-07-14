require './models/artist'
require './models/manager'
require './models/song'

Artist.create({
		name: 'Luciano Pavarotti',
		photo_url: "http://artcreationforever.com/images/luciano-pavarotti/luciano-pavarotti-03.jpg", 
		nationality: 'Italiano',
		instrument: "Voice", 
		home_address: "1 Strada Roma"
	})

Manager.create({
	name: "Ricky Bobby",
	email: "rbobby@gmail.com",
	office_number: "516-877-0304",
	cell_phone_number: "718-989-1231"
	})

Song.create({
	title: "The Best Song Ever",
	duration: "3:31",
	date_of_release: "7/31/2015",
	album_title: "Best Album Ever"
	})
