# Travel Journal - Full-Stack MERN Application

A modern, full-stack travel journal application built with the MERN stack (MongoDB, Express, React, Node.js), TypeScript, and Tailwind CSS.

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete travel entries
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **API Integration**: RESTful API with Express and MongoDB
- **React Router**: Multi-page navigation

## 📁 Project Structure

```
Travel Journal/
├── client/          # React frontend (Vite + TypeScript + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── server/          # Node.js backend (Express + TypeScript + MongoDB)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   └── server.ts
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose (Recommended)
- MongoDB Atlas account (free tier) or local MongoDB instance (if not using Docker)

### 🐳 Quick Start with Docker (Recommended)

1. Make sure Docker Desktop is running on your machine.
2. From the root directory, build and start the containers:
```bash
docker compose up -d --build
```
3. Once the containers are running, navigate to the `server` directory and run the database seeder to populate test data and user accounts (e.g., `pta@example.com` and `ynp@example.com` with password `Password123`):
```bash
cd server
npm install
$env:MONGODB_LOCAL_URI="mongodb://localhost:27017/travel_journal"; npm run seed
```
*(On Mac/Linux use: `MONGODB_LOCAL_URI="mongodb://localhost:27017/travel_journal" npm run seed`)*

4. The application is now running and fully accessible at `http://localhost:3000`

### 💻 Manual Local Setup

#### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_LOCAL_URI=mongodb://localhost:27017/travel_journal
ACCESS_TOKEN_SECRET=your-access-secret-key
REFRESH_TOKEN_SECRET=your-refresh-secret-key
```

4. Start the development server:
```bash
npm run dev
```

The API will be running on `http://localhost:5000`

#### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `client` directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## 📝 API Endpoints

- `GET /api/entries` - Get all travel entries
- `GET /api/entries/:id` - Get a single travel entry
- `POST /api/entries` - Create a new travel entry
- `PUT /api/entries/:id` - Update a travel entry
- `DELETE /api/entries/:id` - Delete a travel entry

## 🎨 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- CORS
- dotenv

## 🔮 Future Enhancements

- [ ] Image upload with Cloudinary
- [ ] Interactive maps with Leaflet or Google Maps
- [ ] JWT Authentication
- [ ] User profiles
- [ ] Search and filter functionality
- [ ] Tags and categories
- [ ] Export to PDF

## 📄 License

ISC

