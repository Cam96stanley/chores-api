# Chore API

A RESTful API for managing household chores, users, and rewards.

## Tech Stack

* Node.js
* Express
* TypeScript
* Biome

## Getting Started

### Prerequisites

* Node.js
* npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
```

### Running the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Running in Production

```bash
npm start
```

## Project Structure

```text
chore-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── app.ts
│   └── server.ts
├── biome.json
├── package.json
├── tsconfig.json
├── .env
└── .gitignore
```

## API

Base URL:

```text
/api
```

### Hello World

```http
GET /api/hello
```

Response:

```json
{
    "message": "Hello, World!"
}
```

## Scripts

| Command          | Description                   |
| ---------------- | ----------------------------- |
| `npm run dev`    | Start the development server  |
| `npm run build`  | Compile TypeScript            |
| `npm start`      | Start the production server   |
| `npm run lint`   | Run Biome checks              |
| `npm run format` | Format the project with Biome |
