# Soil Spaces Backend Service

This repository contains the backend service for **Soil Spaces**, a co-working and community-focused workspace management platform. It provides APIs for users to browse and book workspaces, track their bookings, and allows administrators to manage spaces, bookings, and members.

## Features

### User Features

- **Browse Spaces**: View available co-working spaces with details.
- **Book Workspaces**: Reserve workspaces for specific dates and times.
- **Track Bookings**: View and manage booking history.

### Admin Features

- **Manage Spaces**: Add, update, or remove available spaces.
- **Manage Bookings**: View and update booking details.
- **Manage Members**: Handle member records and access.

## Tech Stack

- **Backend Framework**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Containerization**: Docker and Docker Compose
- **Environment Configuration**: Dotenv

## Getting Started

### Prerequisites

- [Node.js](v18 or above)
- [Docker]and [Docker Compose]
- PostgreSQL database

### Installation

1. Clone the repository:
   git clone https://github.com/Hana175/Co-WorkingSpaceManagementSystem
   cd SoilProject
2. Install dependencies:
   npm install
3. Set up env variables:
   JWT_SECRET = hana
4. Run the application:
   1. Locally: node app.js
      OR
   2. Run the application using Docker Compose:
      docker-compose up --build

### API Endpoints

## User Endpoints

1. GET /spaces
2. POST /bookings
3. GET /bookings/:id

## Admin Endpoints

1. POST /spaces
2. PATCH /spaces/:id
3. DELETE /spaces/:id
4. GET /bookings
5. PATCH /booking/:id: Update the status of a booking (e.g.,
   Pending, Confirmed, Completed, Cancelled).

## Users

    Users who are logged in and have a role of an admin are given a token to add in the bearer section of the Auth header, the token expires after an hour.
    Only admins can:

1. Add a new workspace.
2. Update a workspace details.
3. Delete an existing workspace.
4. Get all bookings in the database.
5. Update a booking's status

## Authentication

Authentication is created using JWT.
