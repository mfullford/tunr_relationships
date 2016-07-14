class CreateManagers < ActiveRecord::Migration
    def change
    	create_table :managers do |t|
       		t.string :name
       		t.string :email
       		t.string :office_number
       		t.string :cell_phone_number

       		t.timestamps null:true
    	end
  	end
end

