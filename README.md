### myFlix Angular Client

A modern, responsive Angular application for browsing movies, managing user profiles, and interacting with the myFlix API.

This project is part of the CareerFoundry Full-Stack Web Development Program and represents the Angular version of the myFlix client-side application.

--------- 

### Overview

The myFlix Angular Client allows users to:
Browse a list of movies retrieved from the myFlix REST API
View detailed information about each movie (genre, director, description)
Register a new account
Log in and receive a JWT for authentication
Add and remove movies from their list of favorites
Update or delete their profile
Enjoy a sleek UI built with Angular Material
This project also includes full TypeDoc-generated documentation.

--------- 

### Built With

- Angular 19
- Angular Material
- TypeScript
- RxJS
- Angular Router
- myFlix REST API (Node.js + MongoDB)
- TypeDoc for documentation

--------- 

### Features & Movie Features

- View all movies
- See detailed movie information in dialogs
- Mark/unmark favorite movies
- Persistent favorites per user (via API)

--------- 

### User Features

Register a new account
Log in with JWT authentication
Automatic login after registration
Update user data
Delete account
Logout system with BehaviorSubject tracking

--------- 

### UI/UX

Fully responsive design
Angular Material components
Dialog-based interfaces (Login / Registration / Movie Details)

--------- 

### Documentation

Full TypeDoc documentation included in /docs

Automatically generated via:
    npm run docs
You can regenerate it anytime using:
    npm run docs

--------- 

### Installation & Setup

### 1 Clone the repository
- git clone https://github.com/ghostmaruko/myflix-client-angular.git
- cd myflix-client-angular

### 2 Install dependencies
- npm install

### 3 Run the development server
- npm start


Then visit:
http://localhost:4200

Make sure your myFlix API backend is running and configured properly.

--------- 

### Project Structure

src/app/
  components/
  services/
  dialogs/
  models/
docs/              ← TypeDoc output
typedoc.json       ← TypeDoc config

--------- 

### Authentication

The app uses JWT (JSON Web Tokens).
On successful login or registration, the API returns:
token
username
These are stored in localStorage and automatically applied to authenticated requests.
The UserAuthService uses an RxJS BehaviorSubject to track login state across components.

--------- 

### Roadmap

- Refactor movie details UI
- Improve profile view design
- Add route guards (optional enhancement)
- Add "Similar Movies" module

--------- 

### Links

myFlix API repository:
- https://github.com/ghostmaruko/myflix-api

Angular Client repository:
- https://github.com/ghostmaruko/myflix-client-angular

Documentation (TypeDoc):
- /docs folder inside the repository

--------- 

### License

This project is part of the CareerFoundry Full-Stack Web Development Program.
Feel free to use it for learning or portfolio purposes.