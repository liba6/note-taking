import NewNotes from '../components/NewNotes';

type Params = {
  params: {};
  searchParams: {
    'note ': string;
  };
};

export default async function createNotes(params: Params) {
  const paramsNote = params?.searchParams?.['note ']?.trim();
  return <NewNotes noteContent={paramsNote} />;
}
