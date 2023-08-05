# Section 1 - Getting Started

1. [x] Setup the project root directory
2. [x] Create this README file
3. [x] Initiate a git repository - deploy3
4. [x] Connect to the git repository 
5. [x] Create the .gitignore file in the root directory
6. [x] initialize node in the root directory - npm init -y

# Section 2 - Server Setup

1. [x] Install express :  npm i express
2. [x] Install nodemon as Dev Dependency :  npm i nodemon -D
3. [x] package.json - set main server file to - server.js
4. [x] package.json - set scritps - 
   1. [x] delete test, 
   2. [x] add "start": 'node server.js", 
   3. [x] "dev": 'nodemon server.js"


# Section 3 - Server.js code - initial

1. [x] import / require express
2. [x] set the constant app to express const app = express();
3. [x] set port to .env port or a number such as 4000
4. [x] make the server start and listen to the port
5. [x] make the server serve some files - index.html and 404.html
   1. [x] import path
   2. [x] create built in middleware - express.static to server files from "public" folder
   3. [x] install tailwindcss for styling
   4. [x] add a route - root.js in the routes folder in the server directory

# Section 4 - Add custom middleware

1. [x] add express.json to server.js
2. [x] create a logs folder to process and store server logs
3. [x] create a middleware folder for all custom middlewares
4. [x] install date-fns and uuid packages for logging - npm i date-fns uuid
5. [x] create a logger.js under middleware - this will be used to set the logger middleware
6. [x] import the logger and logEvents in the server.js
7. [x] add errorHandler.js in the middleware directory
8. [x] add cookie parser package and use it in server.js - npm i cookie-parser
9. [x] install cors - for cross origin requests
10. [x] add a config file for allowed origins - config/allowedOrigins.js in server directory
11. [x] add a config file to setup cors options - config/corsOptions in server directory
12. [x] call the corsOptions in the server.js

# Section 5 - Mongo DB

1. [x] install dotenv and mongoDB
2. [x] Create User Model to store user data along with the roles. The default role will be "Guest"
3. [x] Create a Note model - to let each user create their own notes
4. [x] install mongoose sequence to create a sequence field
5. [x] create a connection file to connect to MongoDB in config
6. [x] connect to MongoDB in server.js after importing dbConn

# Section 6 - Routing and Controllers for User and Note models

1. [x] Create route for users under routes - userRoutes
2. [x] Create a controller for users in /server/controllers - userController
3. [x] install express-async-handler and bcrypt
4. [x] app.use('/', require('./routes/userRoutes')) in server.js to call userRoutes
5. [x] in userRoutes - define all the CRUD operations - GET, POST, PATCH, DELETE and call in the userController routes defined in controllers/usersController.js file
6. [x] Do step 4-6 for Notes - noteRoutes, notesController

# Section 7 - Test the notes and users controllers
1. [x] Create users in db 
2. [x] Get all users in db
3. [x] Update a user in db
4. [x] Delete a user in db
5. [x] Create note in db with a valid user id
   1. [x] Check for duplicate note title
   2. [x] Check for valid user id
6. [x] Get all notes in the db
7. [x] Update note in db for a valid
   1. [x] check for valid note id
   2. [x] check for valid user id
   3. [x] check for duplicate note
   4. [x] allow note update for original note title only
   
# Section 8 - Front End Basics

1. [x] install react-router-dom
2. [x] install heroicons
3. [x] create the basic components for the front-end
   1. [x] Layout
   2. [x] Unauthenticated Pages
      1. [x] LandingPage
      2. [x] Login
   3. [x] Authenticated / Protected pages
      1. [x] Dashboard
      2. [x] Welcome Page - post login
      3. [x] Users Settings / Lost page
      4. [x] Users Notes Page
   
# Section 9 - Data Organization - React Redux, RTK

1. [x] install react-redux @reduxjs/toolkit
2. [x] create an app/api directory for all the data mgt logic using redux and rtk
   1. [x] create apiSlice.js
   2. [x] create usersApiSlice.js and notesApiSlice.js for getting users and notes data from redux
   3. [x] create User.js to feed in the user specific data into usersList.js
   4. [x] create NewUser, EditUser forms. Create NewNote, EditNote forms to do CRUD operations on User and Notes objects from frontend using Redux, RTK and React based frontend

# Section 10 - Authentication - server side

1. [x] add auth route to protect User and Notes routes
2. [x] install express-rate-limit for login limiter
3. [x] create access token and refresh token secrets with node --> require('crypto').randomBytes(64).toString('hex')
4. [x] add authController with routes to perform login, token refresh and logout actions using jwt
5. [x] create an authwrapper verifyJWT to protect every User and Notes route
6. [x] test if the auth works for login, refresh and logout

# Section 11 - Add the front end code for login, logout - Redux, RTK

1. [x] add a redux api slice to perform logout, login
2. [x] add persist login on refresh - usePersist hook and PersistLogin page

# Section 12 - Add data authorization

1. [x] add jwt-decode dependency -for decoding jwt and getting the userinfo and roles
2. [x] create a hook - useAuth - to decode the username, roles from the jwt token and then use it to perform data authorization and protect routes
3. [x] useAuth Hook - NotesList, EditNoteForm
4. [x] create RequireAuth.js - to protect routes - dash and users route - by applying it to App.js

# Section 13 - Code Refactoring - backend

1. [x] usersController and notesController - collation - to check for case sensitive duplicate usernames - make it case insensitive
2. [x] In the User.js model, change the role field definition from: roles: [{
        type: String,
        default: "Guest"
      }], to : roles: {
        type: [String],
        default: ["Guest"]
      },
3. [x] Remove the roles checking from the usersController - and check for only username and password for creating a new user
4. [x] Create a user in the database with default role if no role is provided !Array.isArray(roles) || roles.length check
5. [x] consider using express-async-errors instead of asyncHandler (for future)
6. [x] make changes to error handler (errorHandler.js) middleware - RTK query - isError: true

# Section 14 - Code Refactoring - frontend

1. [x] Changes to notes and users api slice
   1. [x] notesApiSlice - getNotes - validationStatus to be part of the query object
   2. [x] usersApiSlice - getUsers - validationStatus to be part of the query object
   3. [x] Prefetch component - do prefetch instead of initiate
      1. [x] change store.dispatch(notesApiSlice.endpoints.getNotes.initiate()) to store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', {force: true}))
      2. [x] remove the return / unsubscribe portion of the code
2. [x] Add a spinner - npm i react-spinners
   1. [x] In Note, instead of using useSelector and selectNoteById, use useGetNotesQuery from notesApiSlice
   2. [x] use memo from react - const memoizedNote = memo(Note) , export default memoizedNote
   3. [x] do the above two steps for the User component
3. [x] Changes to EditUser component
   1. [x] import { useGetUsersQuery } from './usersApiSlice'
   2. [x] import PulseLoader from 'react-spinners/PulseLoader'
4. [x] Changes to the NewNote and the EditNote component - replace selectors with useGetUsersQuery and useGetNotesQuery

# Section 15 - Front End and Back End Refinements

1. [x] Front End - New User Registration / Sign up form
2. [x] Back End - User Registration end point without verifyJWT
3. [x] Back End - Generate Verification and Reset token utility with crypto (install crypto)
4. [x] Back End - Send the tokens using nodemailer utility (install nodemailer) 
5. [x] Complete the verification in the backend and from the server reirect to the login page on the client side after successful verification