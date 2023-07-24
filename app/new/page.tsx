import NewNotes from '../components/NewNotes';

type Params = {
  params: {};
  searchParams: {
    'note ': string;
  };
};

export default async function createNotes(params: Params) {
  const paramsNote = params?.searchParams?.['note ']?.trim();
  console.log(params, 'params');
  return <NewNotes noteContent={paramsNote} />;
}
