# Admin setup

Admin accounts are stored in MongoDB with scrypt password hashes. No plaintext or default password is committed.

1. Configure `MONGODB_URI` and `SESSION_SECRET` in the root `.env` file.
2. Allow the application host IP in MongoDB Atlas Network Access.
3. Run `npm run db:migrate` once to create indexes and import existing records.
4. Run `npm run admin:setup` and enter the administrator password only at the secure prompt.
5. Start the app with `npm run dev` or `npm start`, then open `/admin`.

Production requires HTTPS, a private `SESSION_SECRET` of at least 48 characters, and `APP_ORIGIN` set to the final HTTPS origin. Rotate any database password that has been shared outside the secret manager.
