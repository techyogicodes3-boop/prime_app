<<<<<<< HEAD
# Prism deployment

The repository root contains only `app/` and `api/` (plus Git metadata). Deploy as two Render services:

- API web service: root directory `api`, build `npm ci`, start `npm start`, health check `/api/health`.
- Frontend static site: root directory `app`, build `npm ci && npm run build`, publish directory `dist`.

For Blueprint-based setup, choose `api/render.yaml` as the Blueprint file path in Render. It configures both services and routes frontend `/api/*` requests to the backend, so browser fetches and session cookies remain same-origin.

Set `MONGODB_URI` and `ADMIN_PASSWORD` in the API service's Render Environment settings. `SESSION_SECRET` is generated in the Blueprint; `APP_ORIGIN` must match the frontend URL (`https://prism-app.onrender.com`) or be updated for a custom domain. Set optional SMTP and WhatsApp environment variables only when those integrations are required. Configure MongoDB Atlas Network Access to allow the deployed API.

Copy `api/.env.example` to `api/.env` for local API development. From `api/`, run `npm ci`, `npm run dev`, `npm run db:migrate`, or `npm run admin:set`. From `app/`, run `npm ci`, `npm run dev`, or `npm run build`. The frontend uses relative `/api` requests; do not place backend secrets in frontend environment variables.

After the first deployment, open the API service Shell and run `npm run admin:set` once to provision the administrator from `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
=======
# prime_app
>>>>>>> 0cb7190419c345e0a39f4b5f92c96f7d03d61db7
