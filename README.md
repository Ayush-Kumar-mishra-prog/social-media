# Connectify

A full-stack social media web application inspired by modern platforms like Instagram, where users can connect, share posts, interact with others, and manage their profiles.

## 🚀 Features

### Authentication
- Secure signup and login
- Clerk authentication integration
- Protected routes
- Session management

### User Features
- Create new posts
- Upload images
- Like posts
- Comment on posts
- Follow / unfollow users
- View user profiles
- Edit profile information
- Real-time notifications
- Responsive mobile-friendly interface

### UI Features
- Modern responsive design
- Toast notifications
- Dynamic routing
- Smooth user experience
- Fast page loading with Vite

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- React Hot Toast
- Moment.js
- Lucide React
- Clerk Authentication

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## 📂 Project Structure

``` Bash
social-site/
│── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│
│── server/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── server.js
│
│── package.json
```
## Installation 
git clone https://github.com/your-username/social-site.git

cd social-site
npm install
cd server
npm install
npm run dev

## Create.env file

MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
PORT=5000



