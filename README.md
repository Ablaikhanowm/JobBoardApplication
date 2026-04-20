# JobBoardApplication

A full-stack job board application built with Spring Boot and React.

## Features

- 🔐 JWT Authentication (Register/Login)
- 👔 Employer Dashboard (Create companies, post jobs)
- 🔍 Job Search (Filters by location, type, experience)
- 📝 Application System (Apply, track status)
- 🌐 External Jobs (Real listings from Adzuna API)
- 📱 Responsive Design

## Tech Stack

**Backend:**
- Java 23
- Spring Boot 3.5
- Spring Security (JWT)
- Spring Data JPA
- PostgreSQL

**Frontend:**
- React 18
- React Router
- Axios


## Installation

### Prerequisites
- Java 23
- Node.js
- PostgreSQL

### Backend Setup
```bash
cd jobboard
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd jobboard-frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/jobs | Get all jobs |
| POST | /api/jobs | Create job |
| GET | /api/companies | Get all companies |

Going to upgrade project by: file uploads, email notifications, saved jobs, job alerts, admin panel, AI Job Matching and AI Resume Parser and Docker Containerization, CI/CD pipeline, real-time chat

