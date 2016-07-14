class AddSong < ActiveRecord::Migration
  def change
  	    create_table :songs do |t|
       		t.string :title
       		t.string :duration 
       		t.string :date_of_release
       		t.string :album_title

       		t.timestamps null:true
    	end
  end
end
