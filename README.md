# css

LVAEP runs a tutoring program in which tutors are assigned students and meet with them over the
course of a term. Tutors record each session they hold — the date, the student, and the number of
hours — and staff collect those records into monthly reports.

This repo is a small full-stack app for that workflow: a React client, an Express/MySQL API, and a
Docker-based MySQL instance for local development.

## Stack

- **Client:** React + Vite, plain CSS, `react-router-dom`
- **Server:** Node.js + Express, `mysql2`
- **Database:** MySQL 8, run via Docker Compose

This is an MVP: there's no login. Every session is recorded against a single seeded tutor
(`DEFAULT_TUTOR_ID` in `server/src/config/constants.js`). Add real auth later by reintroducing a
tutor-scoped session/token and swapping that constant for the authenticated tutor's id.

## Project layout

```
server/   Express API (routes, controllers, middleware, db access)
client/   React app (pages, components, API client)
db/       schema.sql and seed.sql, loaded automatically into the MySQL container
```

## Getting started

### 1. Start the database

```
cp .env.example .env      # adjust DB credentials if you want
docker compose up -d
```

This boots a MySQL container and runs `db/schema.sql` then `db/seed.sql` on first startup, giving
you the one seeded tutor and a couple of example sessions.

### 2. Configure and start the server

```
cd server
cp .env.example .env      # match the DB credentials from step 1
npm install
npm run dev
```

The API listens on `http://localhost:4000` by default.

### 3. Configure and start the client

```
cd client
cp .env.example .env
npm install
npm run dev
```

The client runs on `http://localhost:5173` and proxies `/api` requests to the server.

### All-in-one (optional)

From the repo root:

```
npm install
npm run dev       # runs client + server together via concurrently
```

## Testing

```
cd server && npm test
cd client && npm test
```

## Contributing

- Keep controllers thin — DB queries live in controllers for now, but pull them into a
  `models/` or `repositories/` layer if that stops being true.
- Run `npm run lint` in both `server/` and `client/` before opening a PR.
- New API routes should validate input (see `validators/`).
