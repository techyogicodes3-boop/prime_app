# School Properties

Public routes:

- `/school-properties` — search approved, active and published properties.
- `/school-properties/:slug` — property details.
- `/school-properties/list` — submit an available property.
- `/school-properties/requirement` — submit a property requirement.

Admin routes:

- `/admin/school-properties` — create, edit, approve, publish, activate, archive and delete property records.
- `/admin/school-materials` — manage School Mart listings.

Property records, uploaded media, submissions, notifications and sessions are stored in MongoDB. Run `npm run db:migrate` after configuring Atlas; the operation is idempotent. Public submissions remain pending and unpublished until approved by an administrator.

The API validates every mutation, protects administrator writes with short-lived signed bearer tokens, rate-limits authentication and submissions, and keeps applicant contact details out of public responses. User account authentication remains cookie-session based.
