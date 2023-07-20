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
   
# Section 8 - Front End

1. [ ] install react-router-dom
2. [ ] install heroicons
3. [ ] 