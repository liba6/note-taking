import { cache } from 'react';
import { sql } from './connect';

export const deleteByContent = cache(async (content: string) => {
  await sql`

  DELETE FROM
  notes
  WHERE notes.content = ${content} `;
});
