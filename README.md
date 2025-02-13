# Toolbox-Project

This project is an example application that uses a full-stack stack with a Node.js backend and a React frontend. It uses Docker Compose for container management, Redux Toolkit for frontend state management, and has clear instructions on how to run and test the application.

## To run the app with docker-compose

- Clone the repository
- In the root of the project run `docker compose up -d`
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The api will running in [http://localhost:3002](http://localhost:3002)
- Run `docker compose down` to stop the app

## Backend

- **Node.js**: Version 16

## Available Scripts

### Open folder

### `cd backend`

### Install Dependencies

### `npm i`

### To execute production server

### `npm run start`

### To execute development server

### `npm run dev`

### To execute tests

### `npm run test`

## Frontend

I have used create-react-app to create the app, which is already outdated, the documentation itself suggests using one of the react frameworks, but for the purposes of the exercise I decided to use it

I used [Redux Toolkit](https://redux-toolkit.js.org/) to manage the state of my app.

- **Node.js**: Version 16

## Available Scripts

### Open folder

### `cd frontend`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

I added some test to verify the behavior of the components but I didn't do it 100 percent because of the time.
