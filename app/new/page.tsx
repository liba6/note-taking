import { getNoteById } from '../../database/notes';
import NewNotes from '../components/NewNotes';

export default async function createNotes(params) {
  const paramsNote = params?.searchParams?.['note ']?.trim();

  return <NewNotes noteContent={paramsNote} />;
}
