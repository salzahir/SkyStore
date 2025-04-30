# SkyStore

SkyStore is a full-stack file storage application built with Node.js, Express, Prisma, and Passport.js, offering secure authentication, cloud storage integration, and a responsive user experience.

Features
	•	Secure user registration, login, and session persistence with Passport.js
	•	Password hashing using bcrypt for enhanced security
	•	File and folder CRUD operations with a hierarchical structure
	•	Cloud storage integration via Supabase for scalable file management
	•	Responsive, modern UI optimized for desktop and mobile devices
	•	Database management and querying using Prisma ORM

## Setup

To set up the project locally:

1. Clone the repository: 
   ```bash
   git clone <repo_url>
   cd SkyStore

2.  Run
npm run setup

3. Create a .env file and add the necessary environment variables (e.g., database URL, Supabase credentials).

4.	Start the server:
    npm start

Docker Setup

To run the project with Docker:
	1.	Build the Docker image:

	docker build -t skystore .

	2.	Run the Docker container:
	docker run -p 3000:3000 skystore

Scripts
	•	npm run setup: Installs dependencies and seeds the database.
	•	npm start: Starts the server.
	•	npm run seed: Seeds the database manually.

Tech Stack
	•	Node.js — JavaScript runtime for server-side development
	•	Express.js — Web framework for handling routes and middleware
	•	Prisma — ORM for database management and queries
	•	Passport.js — Authentication middleware for secure login
	•	bcrypt — Password hashing for user data protection
	•	Multer — Middleware for handling file uploads
	•	Supabase — Cloud storage service for scalable file management
