import { getNoteById } from '../../database/notes';
import NewNotes from '../components/NewNotes';

export default async function createNotes(params) {
  console.log('params', params.searchParams);
  const paramsId = params.searchParams['id '].trim();

  const note = await getNoteById(paramsId);
  const noteContent = note[0]?.content;

  return <NewNotes />;
}
