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
* pnpm

### Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
```

### Running the Development Server

```bash
pnpm dev
```

### Building for Production

```bash
pnpm build
```

### Running in Production

```bash
pnpm start
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
