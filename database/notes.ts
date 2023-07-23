import { cache } from 'react';
import { sql } from './connect';

export const createNewNote = cache(async (content: string) => {
  await sql`
  INSERT INTO notes(content)
  VALUES (${content} )
`;
});

export const getAllNotes = cache(async () => {
  const note = await sql`
  SELECT
  *
  FROM
  notes`;
  return note;
});
