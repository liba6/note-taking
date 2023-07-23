export async function up(sql) {
  await sql`
  CREATE TABLE notes(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content varchar (100) NOT NULL,
    date timestamp NOT NULL DEFAULT NOW()
  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE notes`;
}
