# SkyStore

SkyStore is a full-stack file storage application built with Node.js, Express, Prisma, and Passport.js, offering secure authentication, cloud storage integration, and a responsive user experience.

<img src="public/assets/logo.png" alt="Sky Store Logo" width="300" height="auto" />

## Features

### Authentication & Security
- Secure user registration and login with Passport.js
- Password hashing using bcrypt
- CSRF protection for all routes
- Password reset functionality with email recovery
- Session management with secure cookie handling

### File Management
- Hierarchical folder structure support
- File upload with progress tracking
- File download and preview capabilities
- Cloud storage integration via Supabase
- Support for multiple file types
- File metadata tracking (size, type, upload date)

### User Experience
- Modern, responsive UI design
- Breadcrumb navigation for folder structure
- Intuitive file and folder management
- Success/error notifications
- Mobile-friendly interface

### Development Features
- Environment-aware logging system
- Docker support for easy deployment
- Database seeding for development
- Modular code structure
- TypeScript support with Prisma

## Tech Stack

- **Backend**
  - Node.js & Express.js
  - Prisma ORM for database management
  - Passport.js for authentication
  - Multer for file uploads
  - Supabase for cloud storage
  - Resend for email services

- **Frontend**
  - EJS templating engine
  - Custom CSS for styling
  - Responsive design

- **Database**
  - PostgreSQL (via Prisma)
  - UUID for unique identifiers

## Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Supabase account
- Resend account for email services

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/salzahir/SkyStore.git
   cd SkyStore
   ```

2. Install dependencies and seed the database:
   ```bash
   npm run setup
   ```

3. Create a `.env` file with the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/skystore"
   SESSION_SECRET="your-session-secret"
   SUPABASE_URL="your-supabase-url"
   SUPABASE_KEY="your-supabase-key"
   RESEND_API_KEY="your-resend-api-key"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t skystore .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 skystore
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm run seed` - Seed the database with sample data
- `npm run setup` - Install dependencies and seed the database

## Project Structure

```
SkyStore/
├── src/
│   ├── controllers/    # Route controllers
│   ├── db/            # Database queries and seed data
│   ├── middleware/    # Custom middleware
│   ├── routes/        # Route definitions
│   ├── utils/         # Utility functions
│   └── views/         # EJS templates
├── public/            # Static assets
├── prisma/           # Prisma schema and migrations
└── uploads/          # Temporary file storage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
