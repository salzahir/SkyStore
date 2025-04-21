# SkyStore

SkyStore is an online store application built with Node.js, Express, Prisma, and Passport.js for user authentication.

## Features

- User registration and login
- Secure password hashing with bcrypt
- Authentication using Passport.js
- Data persistence with Prisma and SQLite (or your database of choice)

## Setup

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd SkyStore

2.  Run
npm run setup

3.	Create a .env file and add the necessary environment variables (e.g., database URL).

4.	Start the server:
    npm start

Scripts
	•	npm run setup: Installs dependencies and seeds the database.
	•	npm start: Starts the server.
	•	npm run seed: Seeds the database.

Tech Stack
	•	Node.js: JavaScript runtime for server-side development.
	•	Express.js: Web framework for Node.js.
	•	Prisma: ORM for database management.
	•	Passport.js: Authentication middleware.
	•	bcrypt: Library for password hashing.
