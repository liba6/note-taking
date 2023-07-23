import { getAllNotes } from '../database/notes';
import { AllNotes } from './components/AllNotes';

export default async function Notes() {
  const allData = await getAllNotes();

  return (
    <div>
      <AllNotes allData={allData} />
    </div>
  );
}
