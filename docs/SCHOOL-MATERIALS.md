# School Mart

School Mart records and images are stored in MongoDB. The public search supports sale, lease, share and requirement listings; the removed `For Rent` transaction is not accepted by validation or shown in filters.

Administrators manage listings at `/admin/school-materials`. Provision the administrator through `npm run admin:setup`; no default production password is supplied.

Run `npm run db:migrate` after configuring `MONGODB_URI`, then use `npm run dev` for local development or `npm start` after `npm run build` in production.
