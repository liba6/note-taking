Note-Taking Simplified.

Wanderlust is a mobile-first frontend app that allows users to create, modify, delete and display their notes.

Architecture: </br>
Frontend: Next.js 13 as the frontend framework to build our web app. </br>

Technologies Used:

- Next.js
- TypeScript / JavaScript
- React
- Bootstrap

Visual Design of App:

Landing page/Notes List:
<br>
![landingpage](public/notes.png)

Create new notes/edit page:
<br>
![attractionspage](public/create.png)

Setup Instructions: </br>

- git clone the Github repo to your local machine
- Install Next.js yarn add create-next-app
- Setup the database by downloading and installing PostgreSQL
- Create a user and a database
- Copy the .env.example file to a new file called .env (this will be ignored from Git)
- Replace the ##### with username, password and name of your database
- Install dotenv-cli with yarn add dotenv-cli
- Run the migrations with yarn migrate up
- Finally, start the server by running yarn dev
