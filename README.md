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


This is the screeshot of my anime table craeted using "table plus"

<img width="1362" alt="Screen Shot 2022-09-09 at 17 58 11" src="https://user-images.githubusercontent.com/92860992/189392372-e7a5f126-69c1-4ec0-928f-aa9e34bbfa5b.png">


Once I finished with the above I started working on controllers and secure routes. Here I did steps such as validating my token, checking to see if the token exists, removing the bearer from the token and decoding it and getting the user information from the token. Also setting the current user as a global variable, so I can access it inside my controllers.

````
def secure_route(route_func):
    @wraps(route_func)
    def decorated_function(*args, **kwargs):
    
        raw_token = request.headers.get("Authorization")
        print("TOKEN", raw_token)
        print("HEADERS", request.headers)
        if not raw_token:
            return {"message": "Unauthorized"}, HTTPStatus.UNAUTHORIZED
        clean_token = raw_token.replace("Bearer ", "")

        try:
            payload = jwt.decode(clean_token, secret, "HS256")
          
            user_id = payload["sub"]
          
            user = UserModel.query.get(user_id)

            if not user:
                return {"message": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

            g.current_user = user
            
        except jwt.ExpiredSignatureError:
            return {"message": "Token has expired"}, HTTPStatus.UNAUTHORIZED

        except Exception as e:
            return {"message": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

        return route_func(*args, **kwargs)

    return decorated_function
````


## Front-End

Because I was working solo and spent more than I had palnned on the backend, I decided to keep the front-end simple so I would meet the deadline on time.
For the front-end alongside React I decided to use TypeScript instead of JavaScript. I started by creating all the different components as well as a Navbar. I then added all my routes inside of the App.js file.

````
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Createanime" element={<Createanime />} />
        <Route path="/anime" element={<AnimeIndex />} />
        <Route path="/anime/:animeId" element={<AnimeShow />} />
      </Routes>
    </Router>
  )
}

export default App
````
**Interfaces**
I created different interfaces for my Animes, Authentications, Comments and users. I then imported these interfaces inside my components and used them.

<img width="1436" alt="Screen Shot 2022-09-13 at 14 12 28" src="https://user-images.githubusercontent.com/92860992/189899399-252cad3a-9bf5-41b9-9699-f364f7d4a8bf.png">

**Register Page**

Here I put the form fields in state because the state will change after the user fills the form and I pass in register interfaces which I created in the interfaces folder. I then created a handle change and the handle submit function to my register form.

````
  const [formData, setFormData] = useState<RegisterInterface>({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
  })

````
<img width="705" alt="Screen Shot 2022-09-13 at 14 00 01" src="https://user-images.githubusercontent.com/92860992/189895462-4346b9c0-f3a0-4c0f-a3fe-884a07f0781b.png">








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
- Being able to get TypeScript work at the front-end after only learning it for a couple of days


## Future Development
- Fix the issue with the back-end environment
- Error handling for the login, signup and create anime page
- Add the functionality to allow the users to contact each other
- Implement mobile version
- Add functionality for editing comments

## Key Learning






