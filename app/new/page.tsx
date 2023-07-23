import { getNoteById } from '../../database/notes';
import NewNotes from '../components/NewNotes';

export default async function createNotes(params) {
  const paramsId = params?.searchParams?.['id ']?.trim();

  const note = await getNoteById(paramsId);
  let noteContent = note[0]?.content;
  console.log('noteContent', noteContent);

  return <NewNotes noteContent={noteContent} />;
}
