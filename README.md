<<<<<<< HEAD
# Prism deployment

The app and API are separate repositories. This repository is the backend (`prime_backend`); the frontend is `prime_frontend`.

- API web service: build `npm ci`, start `npm start`, health check `/api/health`.
- Frontend static site: build `npm ci && npm run build`, publish directory `dist`.

For Blueprint setup, choose `render.yaml` as the Blueprint file path in Render. The frontend connects directly to the backend, so no frontend API rewrite is required.

Set `MONGODB_URI` and `ADMIN_PASSWORD` in the API service's Render Environment settings. `SESSION_SECRET` is generated in the Blueprint; `APP_ORIGIN` must match the frontend URL (`https://prism-app.onrender.com`) or be updated for a custom domain. Set optional SMTP and WhatsApp environment variables only when those integrations are required. Configure MongoDB Atlas Network Access to allow the deployed API.

Copy `.env.example` to `.env` for local API development. Run `npm ci`, `npm run dev`, `npm run db:migrate`, or `npm run admin:set`. The frontend uses relative `/api` requests; do not place backend secrets in frontend environment variables.

After the first deployment, open the API service Shell and run `npm run admin:set` once to provision the administrator from `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
=======
# prime_app
>>>>>>> 0cb7190419c345e0a39f4b5f92c96f7d03d61db7
