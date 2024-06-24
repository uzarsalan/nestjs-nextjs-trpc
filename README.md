## Give it a spin:

First make sure you add an `.env.local` file inside the `web` app with the following variable:

```env
NEXT_PUBLIC_NESTJS_SERVER=http://localhost:4000
```

And `.env` file inside `server` app:

```env
DB_HOST =
DB_USERNAME =
DB_PASSWORD =
DB_DATABASE =
DB_PORT =
```

Then install the dependencies:

```
pnpm install
pnpm dev       # starts local server for both frontend (NextJS) and backend (NestJS)
```
