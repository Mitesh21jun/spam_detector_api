# Spam Detector API

This project is a REST API for a mobile app that detects spam phone numbers and allows users to find a person’s name by searching for their phone number. The API is built using Node.js, Express, TypeScript, and Sequelize ORM with PostgreSQL for data persistence.

## Features

- User registration and login
- Mark phone numbers as spam
- Search for contacts by name or phone number
- JWT authentication for secure API access

## Prerequisites

- Node.js (>= 14.x)
- PostgreSQL
- npm (>= 6.x) or yarn (>= 1.x)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/spam-detector-api.git
cd spam-detector-api
```

### 2. Install Dependencies

```bash
npm install
```

#### or

```bash
npm install
```

### 3. Set Up Environment Variables (/.env file)

```bash
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run Database Migrations

```bash
npx sequelize-cli db:migrate
```
#### or seed data

```bash
npm run seed
```

### 5. Start the Server

```bash
npm start
```

#### or
```bash
yarn start
```

