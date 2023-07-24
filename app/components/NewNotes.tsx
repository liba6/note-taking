'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewNotes({ noteContent }) {
  const [content, setContent] = useState(noteContent);
  const router = useRouter();
  console.log('noteContent', noteContent);

  async function handleSave() {
    // retrieve any notes from local storage

    const existingData = window.localStorage.getItem('notes');

    let notesParsed = existingData ? JSON.parse(existingData) : [];

    // date
    const currentDate = new Date().toLocaleDateString();

    // check to see if note exists (so won't save same note again)
    let existingNoteIndex = notesParsed.findIndex(
      (item) => item.note === noteContent,
    );

    if (existingNoteIndex !== -1) {
      notesParsed[existingNoteIndex].note = content;
      notesParsed[existingNoteIndex].date = currentDate;
    } else {
      // note doesnt exist, so add new note content

      const newNote = {
        note: content,
        date: currentDate,
      };

      notesParsed.push(newNote);
    }

    window.localStorage.setItem('notes', JSON.stringify(notesParsed));

    // redirect to notes list and refresh
    router.push('/');
    router.refresh();
  }

  async function handleDelete(content) {
    const storage = window.localStorage.getItem('notes');
    const existingNotes = JSON.parse(storage) || [];
    const filteredNotes = existingNotes.filter((item) => item.note !== content);
    window.localStorage.setItem('notes', JSON.stringify(filteredNotes));

    // redirect to notes list and refresh
    router.push('/');
    router.refresh();
  }

  return (
    <div>
      <h1>Note Edits Page</h1>
      <label>
        New Note
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
      </label>
      <button onClick={handleSave}> Save</button>
      <button onClick={() => handleDelete(content)}>Delete</button>
      <hr />

      <Link href="/..">
        <button>Back to Notes List</button>
      </Link>
    </div>
  );
}
