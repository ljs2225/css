// MVP: no auth yet, every session is recorded against this single seeded tutor.
// tutors.email is the primary key (see db/schema.sql), so this is an email, not a numeric id.
export const DEFAULT_TUTOR_EMAIL = 'ljs2225@columbia.edu';
