class Artist < ActiveRecord::Base
	has_many :song, dependent: :destroy
end
