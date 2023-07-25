'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../app/new/page.module.scss';
import { Note } from './AllNotes';

export default function NewNotes({
  noteContent,
}: {
  noteContent: string | undefined;
}) {
  const [content, setContent] = useState<string>(noteContent || '');

  const router = useRouter();

  async function handleSave() {
    // retrieve any notes from local storage

    const existingData = window.localStorage.getItem('notes');

    let notesParsed = existingData ? JSON.parse(existingData) : [];

    // date
    const currentDate = new Date().toLocaleDateString();
    // check if content empty
    if (content === '') {
      alert('Please write a note');
      return;
    }
    // check to see if note exists (so won't save same note again)
    let existingNoteIndex = notesParsed.findIndex(
      (item: Note) => item.note === noteContent,
    );
    // if exists, update
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

  async function handleDelete(content: string) {
    const storage = window.localStorage.getItem('notes') as string;
    const existingNotes: Note[] = JSON.parse(storage) || [];
    const filteredNotes = existingNotes.filter((item) => item.note !== content);
    window.localStorage.setItem('notes', JSON.stringify(filteredNotes));

    // redirect to notes list and refresh
    router.push('/');
    router.refresh();
  }

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Note-Taking Simplified </h1>
      <div className="container">
        <div className="row gx-4 ">
          <div className="col col-3 mt-5 mb-5 ">
            <div className="form-floating ">
              <input
                className="form-control"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="New Note"
              />
              <label className="form-label">Write A Note</label>
            </div>
          </div>
          <div className="col col-2 mt-5 mb-5 ">
            <button onClick={handleSave} className="btn btn-outline-success">
              Save
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(content)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Link href="/">
        <button type="button" className="btn btn-info">
          My Notes List
        </button>
      </Link>
      <div className={styles.container}>
        <img src="/sticky.jpeg" alt="clocks image" className={styles.image} />
      </div>
    </div>
  );
}
