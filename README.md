# Social Media API

This is a RESTful API for a social media platform built with Express.js and MongoDB. It provides endpoints for user authentication, user profile management, and social media feed functionality.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)

## Features

- User registration and authentication
- User profile management
- Create and interact with posts (create, comment, like)
- Retrieve user feed

## Prerequisites

- Node.js (v20+ recommended)
- npm (v10+recommended)
- MongoDB url

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/57ajay/chatwise
   cd chatwise
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Start the server:
   ```
   npm start
   /or/
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
PORT=5173
```

## API Endpoints

### User Routes

- `POST /api/user/register`: Register a new user
- `POST /api/user/login`: Login user
- `POST /api/user/logout`: Logout user (requires authentication)
- `GET /api/user/profile`: Get user profile (requires authentication)

### Feed Routes

- `GET /api/feed/all-feed`: Get user feed (requires authentication)
- `POST /api/feed/post`: Create a new post (requires authentication)
- `POST /api/feed/post/:postId/comment`: Add a comment to a post (requires authentication)
- `POST /api/feed/post/:postId/like`: Like a post (requires authentication)

## Usage Examples

### Register a new user

```bash
curl -X POST http://localhost:5173/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "email": "john@example.com", "password": "password123", "fullName": "John Doe"}'
```

### Login

```bash
curl -X POST http://localhost:5173/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Create a new post

```bash
curl -X POST http://localhost:5173/api/feed/post \
  -H "Content-Type: application/json" \
  -H "Cookie: token=your_auth_token" \
  -d '{"content": "Hello, world!"}'
```

### Get user feed

```bash
curl -X GET http://localhost:5173/api/feed/all-feed \
  -H "Cookie: token=your_auth_token"
```


## Contributing and suggesting

If you want to add or suggest new feature feel free to do so.
I am open for suggestions of all kind, let's make it bigger and larger together.

