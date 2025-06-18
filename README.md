# Musician Gear Tracker

A comprehensive web application for musicians to inventory, track, and maintain their musical equipment.

## Overview

The Musician Gear Tracker is designed to help musicians manage their gear collection efficiently, with features for maintenance tracking, insurance documentation, and sharing capabilities.

## Features

- **Equipment Inventory Management**: Add, categorize, and store detailed information about instruments and equipment
- **Maintenance Tracking**: Log maintenance activities, set reminders, and track gear condition over time
- **Insurance Documentation**: Generate reports for insurance purposes, store receipts, and calculate collection value
- **User Account System**: Secure account management with multi-device access
- **Sharing and Collaboration**: Share gear information with bandmates or repair technicians with controlled access

## Tech Stack

- **Frontend**: React.js with TypeScript, Material-UI, Redux Toolkit
- **Backend**: Node.js with Express, JWT authentication
- **Database**: PostgreSQL for data, AWS S3 for file storage
- **DevOps**: Docker, GitHub Actions, AWS deployment

## Development Setup

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dxaginfo/musician-gear-tracker.git
cd musician-gear-tracker
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
```bash
# Create .env files in both frontend and backend directories
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

5. Edit the `.env` files with your local configurations (database connection, S3 credentials, etc.)

6. Set up the database:
```bash
cd backend
npm run db:migrate
npm run db:seed  # Optional: adds sample data
```

7. Start the development servers:
```bash
# In backend directory
npm run dev

# In frontend directory (in a separate terminal)
npm start
```

8. Access the application at `http://localhost:3000`

## Docker Setup (Alternative)

1. With Docker and Docker Compose installed, run:
```bash
docker-compose up
```

2. Access the application at `http://localhost:3000`

## Deployment

This application can be deployed using:

1. AWS Elastic Beanstalk for the backend
2. Vercel or Netlify for the frontend
3. AWS RDS for PostgreSQL
4. AWS S3 for file storage

Detailed deployment instructions are available in the [deployment documentation](./docs/deployment.md).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the needs of musicians for better gear management
- Project plan and architecture designed as part of a music industry solutions initiative