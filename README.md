# Hype

Hype is a full-stack social media app where users can create an account, share posts, upload reels and stories, chat in real time, and follow other people on the platform.

The project is split into two parts:

- `frontend` for the React app
- `backend` for the Express API, database logic, authentication, and Socket.IO

## What this app can do

- Create an account and sign in with username or email
- Stay logged in with a cookie-based JWT auth flow
- Reset password with OTP sent to email
- Edit profile details like name, username, bio, profession, gender, and profile image
- Create image or video posts with captions
- Like, comment on, and save posts
- Upload reels and interact with them
- Upload stories and view stories by user
- Search users and follow or unfollow them
- Get suggested users
- Send messages with real-time updates
- See online users with Socket.IO
- Receive notifications for activity inside the app

## Tech stack

### Frontend

- React
- Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Socket.IO Client
- React Icons

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary
- Nodemailer
- Socket.IO

## Project structure

```text
Hype/
  frontend/
    src/
      components/
      hooks/
      pages/
      redux/
      services/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
```

## Frontend highlights

The frontend is built with React and Vite. Routing is handled with `react-router-dom`, global state is managed with Redux Toolkit, and API calls are handled through Axios.

Main pages available in the app:

- Home feed
- Sign up
- Sign in
- Forgot password
- Profile
- Edit profile
- Search
- Reels
- Story viewer
- Messages
- Notifications
- Upload

Important frontend folders:

- `src/pages` contains screen-level pages
- `src/components` contains reusable UI parts
- `src/hooks` contains app logic for auth, posts, stories, reels, and messages
- `src/redux` contains slices for user, posts, reels, stories, messages, notifications, and socket state
- `src/services/api.services.js` contains all API request functions

Frontend scripts from `frontend/package.json`:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Backend highlights

The backend is an Express server connected to MongoDB. It uses JWT stored in cookies for authentication and Socket.IO for real-time messaging and online user tracking.

Main backend features:

- User authentication and protected routes
- Profile management
- Post, reel, and story upload
- Comment and like handling
- Follow system
- Notifications
- Real-time messaging
- OTP email flow for password reset

Main API route groups:

- `/api/auth`
- `/api/user`
- `/api/post`
- `/api/reel`
- `/api/story`
- `/api/message`

Backend scripts from `backend/package.json`:

```bash
npm run dev
```

## Environment variables

Create a `.env` file inside the `backend` folder and add the values your app needs.

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret

MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

FRONTEND_LOCAL_URL=http://localhost:5173
FRONTEND_VERCEL_LINK=https://your-frontend-domain.vercel.app
NODE_ENV=development
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:8000
```

## How to run the project locally

### 1. Install dependencies

In one terminal:

```bash
cd backend
npm install
```

In another terminal:

```bash
cd frontend
npm install
```

### 2. Start the backend

```bash
cd backend
npm run dev
```

### 3. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend should open on `http://localhost:5173` and the backend should run on `http://localhost:8000`.

## Notes

- The frontend sends requests with credentials, so backend CORS and cookie settings matter.
- In production, cookie settings switch to secure mode.
- Cloudinary is used for uploaded media.
- Gmail is used for sending OTP emails, so an app password is usually needed.

## Future improvements

- Add automated tests
- Add better error states and empty states
- Add admin or moderation tools
- Improve media upload validation
- Add pagination for feeds and messages

## Author

Built as a full-stack social media project using React, Express, MongoDB, and Socket.IO.
