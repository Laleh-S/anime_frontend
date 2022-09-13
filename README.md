# Anime Cue

Link to Project https://anime-cue.netlify.app/

## Overview
This is the site for Anime lovers to visit and talk and comment about different anime films as well as uploading their own favourite anime. The assignment was to be completed solo within two weeks over a total of 6 working days.

## Requirements
- Build a full-stack CRUD application 
- Use Python Flask 
- Use React front-end
- Use postgreSQL
- Have a visually impressive design
- Must be deployed online and accessible to the public


## Technologies Used
- Python
- Flask
- PostgreSQL
- React
- TypeScript
- CSS
- Bulma
- Git
- GitHub

## Planning and Whiteboarding
I started off with planning and whiteboarding of the functions and the features I would like to include in my project as well as planning the timeline and setting a target for MVP.

<img width="1168" alt="Screen Shot 2022-09-09 at 16 49 12" src="https://user-images.githubusercontent.com/92860992/189378519-945088da-716d-4f1d-9715-d1b72135126d.png">

I have also created a database relationship diagram.

<img width="1358" alt="Screen Shot 2022-09-09 at 17 35 41" src="https://user-images.githubusercontent.com/92860992/189388060-dd429bbd-1059-44d6-a27a-cf3087f70ce7.png">


## Back-End
I started by creating a database using PostgreSQL. I then created the base model with all the common fields that all my models will have. 
````
class animeModel(db.Model, BaseModel):

  __tablename__ = "animes"

  title = db.Column(db.Text, nullable=False, unique=True)
  original_title = db.Column(db.Text, nullable=False)
  image = db.Column(db.Text, nullable=False)
  director = db.Column(db.Text, nullable=False)
  producer = db.Column(db.Text, nullable=False)
  release_date = db.Column(db.Integer, nullable=False)
  description = db.Column(db.Text, nullable=False)

  user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
  genres = db.relationship('GenreModel', backref='genres', secondary=anime_genre)
  comments = db.relationship('CommentModel', backref='comments', cascade="all, delete")

  user = db.relationship('UserModel', backref='users')
````


I then seeded my database with anime data. Here is my Anime table, it extends the db.Model and the BaseModel. By extending db.Model Flask-SQLAlchemy knows  about my model, so it can use it.  **__tablename__ = "animes"** used directly to create a TABLE in Postgresql. Here I used specific columns for my Anime Table.
````

from app import db
from models.base import BaseModel

from models.anime_genre import anime_genre
from models.genre import GenreModel
from models.comment import CommentModel
from models.user import UserModel


class animeModel(db.Model, BaseModel):

  __tablename__ = "animes"

  
  title = db.Column(db.Text, nullable=False, unique=True)
  original_title = db.Column(db.Text, nullable=False)
  image = db.Column(db.Text, nullable=False)
  director = db.Column(db.Text, nullable=False)
  producer = db.Column(db.Text, nullable=False)
  release_date = db.Column(db.Integer, nullable=False)
  description = db.Column(db.Text, nullable=False)

  user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
 
  genres = db.relationship('GenreModel', backref='genres', secondary=anime_genre)
  comments = db.relationship('CommentModel', backref='comments', cascade="all, delete")

  user = db.relationship('UserModel', backref='users')
````

<img width="1362" alt="Screen Shot 2022-09-09 at 17 58 11" src="https://user-images.githubusercontent.com/92860992/189392372-e7a5f126-69c1-4ec0-928f-aa9e34bbfa5b.png">

## Project Screenshots
#### Homepage
<img width="1436" alt="Screen Shot 2022-09-09 at 18 41 01" src="https://user-images.githubusercontent.com/92860992/189399811-698251cd-3541-4bee-bd7c-59d49b106904.png">

#### Anime Index Page
<img width="755" alt="Screen Shot 2022-09-09 at 19 30 17" src="https://user-images.githubusercontent.com/92860992/189417802-292d3203-8e84-4ed6-ba39-a2e165b13c2f.png">

#### Anime Show Page 
<img width="988" alt="Screen Shot 2022-09-09 at 19 29 25" src="https://user-images.githubusercontent.com/92860992/189417854-2110ce40-2035-4909-82f6-1a7c3255aa77.png">


## Bugs
Due to the issues with my back-end environment folder which has to do with the way I use PostgreSQL (database driver), the ability to register or login is disabled on the deployed version. The login and registration is only possible locally. 

## Challenges
The main challenge in this project for me was doing the front-end in TypeScript after only learning it for a couple of days. Majority of the time I spent on the front-end was figuring out and learning how to get things done in TypeScript. I therefore did not have enough time to reach my stretch goals.


## Wins
- Being able to create a functioning and responsive site
- Being able to get TypeScript work at the front-end


## Future Development
- Fix the issue with the back-end environment
- Error handling for the login, signup and create anime page
- Add the functionality to allow the users to contact each other
- Implement mobile version
- Add functionality for editing comments





