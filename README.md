<!--
Creator: JP Barela  
Market: Denver
-->

![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Building Models

### Why is this important?
<!-- framing the "why" in big-picture/real world examples -->
*This workshop is important because:*

Most applications include more than one model. Most of these models are related in some 
way, for instance, artists play multiple songs. ActiveRecord provides helpful methods for working with related models, just like finding and querying a single table.

### What are the objectives?
<!-- specific/measurable goal for students to achieve -->
*After this workshop, developers will be able to:*

- Create ActiveRecord models with ``has many`` and ``belongs to`` relationships
- Create ActiveRecord models with ``has many through`` relationships
- Create ActiveRecord models with ``has one`` relationships 

### Where should we be now?
<!-- call out the skills that are prerequisites -->
*Before this workshop, developers should already be able to:*

- Create a simple Sinatra app
- Set and get data from a SQL database using ActiveRecord 

## Relationships 

It's time to start adding some relationships to the existing Tunr database. We're going to 
help include information from the various models on different pages. We'll end up adding 
song information to artists, help managers gain some credibility by listing the songs of their 
clients. Finally we'll add an optional revenue source by enabling managers to create an ad 
to help attract new clients.

When we originally started planning Tunr we created the following ERD, 

![Tunr ERD](https://github.com/den-wdi-1/tunr-relationships/blob/master/tunr_erd.png)

In this lab, we'll be implementing some of the ERD in our Tunr app.

#### Sprint 0 Setup the application
What are the steps to setup a new application from Github?

<details>
Fork/clone the repo, bundle install, rake db:setup (rake db:setup runs rake db:create and rake
 db:schema:load, as well as running your seed file).

This repo uses a different database than our Tunr database from yesterday so you'll need to 
create it from scratch.
</details>

It's also a good idea to do a review of the code and see what dependencies are included. What might be some useful dependencies that are included?

<details>
rerun, tux
</details>

#### Sprint 1 Songs and Artists 
Our first goal is to add a list of songs to the artist detail page and add the artist name
to the list of songs. To do this, we'll create a **has many** relationship between the 
``Artist`` and ``Song`` models.

To do this we'll need to:

1. Update the models to list the relationship
1. Update our database 
2. Add songs to an artist
2. Update our ERB accordingly


__Update our models:__
To update our models we need to add only two lines of code. We update the 
``models\artist.rb`` file to:

```ruby
class Artist < ActiveRecord::Base
  has_many :songs
end
```

We update ``models\song.rb`` to:

```ruby
class Song < ActiveRecord::Base
  belongs_to :artist
end
```

__Prep the database:__

We need to help the SQL database understand the relationship as well as our app. In order to 
make the link in the database we need to create the migration. The migration is simple. We 
do this often enough that ActiveRecord provides a special method for adding references.

```ruby
def change
  add_reference :songs, :artist
end
```

When you're looking to understand which side of the relationship to add the reference to, 
a good rule of thumb is to create the reference on the ``belongs_to`` side of the 
relationship.

__Making the relationship__ 

Once we've updated our models and database, we now have access to methods describing the 
relationship. Let's look at the following code:

```ruby
  luciano = Artist.first
  luciano.songs
  all_songs = Song.all
  luciano.songs = all_songs
  luciano.save
```

First we find an Artist. If we're using the seed file, the first artist is Luciano Pavoritti.
Next, we can see that ActiveRecord add a songs method to artist instances.  This acts just like an 
array. In particular, if we find all of the songs and assign those songs to the array, we can
associate all the songs to ``luciano``. If we save ``luciano``, ActiveRecord takes care of 
which records need to be saved and makes sure the database reflects what we just did in Ruby.

Run the code in tux so that there are now songs associated to ``luciano``.

Similarly, ActiveRecord added an ``.artist`` method to the song instances. The ``.artist`` method gives 
us the Artist associated with a song.

__Update our ERBs:__

To the ``artists/show.erb``, let's add an unordered list: 
```ruby
<ul>
  <% @artist.songs.each do |song| %>
    <li><%= song.title %></li>
  <% end %>
</ul>
```

In the ``songs/index.erb``, we can add an ``<li>`` tag right after the title with the artist
name:

```ruby
<li>
  <%= song.artist.name %>
</li>
```

Make sure your server is updated and let's review our work!

#### Sprint 2 Managers and Songs through Artists

Just like artists, managers need to highlight the hit songs they are associated with. Like with 
artists, we'll add the songs to the show route of the managers.

First, we need to create a ``has many`` relationship between managers and artists. Try to do 
this yourself. 

Here's a hint if you need it:
<details>
1. Add the ``has_many`` method to the ``Manager`` model and the ``belongs_to`` method to 
``Artist``

2. Create a migration to reference manager from artists

3. Add an artist to a manager
</details>

Once we've added the ``has_many`` relationship between ``Manager`` and ``Artist``, adding 
the ``has_many through`` relationship is easy. In fact, all we need to do is add two lines. In ``models/manager.rb`` we add 

```ruby
  has_many :songs, through: :artists
```

And in songs we add

```ruby
  belongs_to :manager
```

Once we add these lines, ActiveRecord adds a ``.songs`` method to ``Manager`` that acts like an array 
of array of songs. ActiveRecord also adds a ``.manager`` to the ``Song`` instances to let us get the 
``Manager`` associated with a song.

Now, add an unordered list of the manager's songs to ``managers/show.erb``.

Tip: ActiveRecord has some trouble with writing to ``has_many through`` relationships and 
it should be treated more as a read only relationship.

#### Sprint 3 Manager Ads
Last but not least let's start adding some revenue to Tunr. We're enabling managers to create
ads to help drum up business.

We'll do the following steps to add ads to our managers.

1. Create a new class ``Ad`` that inherits from ``ActiveRecord::Base`` and includes a 
``has_one`` relationship to ``Manager``.
1. Add ``belongs_to`` in the ``Manager`` model.
1. Create a migration that adds an ``Ad`` table with a fields ``headline`` and ``url``. Also 
add a reference to the ``managers`` table pointing to the ``Ad`` model.
2. Create a new Ad in tux and associate the Ricky Bobby manager to the ad.
1. On the manager index page, for each manager add the ad headline as a link to the ad url.

## Closing Thoughts
Relationships are one of the most powerful ways we have of manipulating data. It let's us 
use the Ruby methods that are much more used to and comfortable with rather than SQL which 
can be messy and lead to bugs.

## Resources

- [ActiveRecord Associations Official Docs](http://guides.rubyonrails.org/association_basics.html)

## Licensing

All content is licensed under a CC­BY­NC­SA 4.0 license. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact <a href="mailto:legal@ga.co">legal@ga.co</a>.
