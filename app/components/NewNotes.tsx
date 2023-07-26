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

    // if trying to save params as diff saved note

    // if params input note exists in storage already
    let existingNoteIndex = notesParsed.findIndex(
      (item: Note) => item.note === noteContent,
    );
    if (
      existingNoteIndex !== -1 &&
      // and new input content exists in storage
      notesParsed.some((item: Note) => item.note === content) &&
      // new content is not params
      notesParsed[existingNoteIndex].note !== content
    ) {
      alert('This note appears in your note list already');
      return;

      // if trying to update or resave params
    } else if (existingNoteIndex !== -1) {
      // if input differs from params
      if (notesParsed[existingNoteIndex].note !== content) {
        notesParsed[existingNoteIndex].note = content;
        notesParsed[existingNoteIndex].date = currentDate;
      } else {
        // content is the same, show alert for identical entries
        alert('This note appears in your note list already');
        return;
      }
    } else {
      // new entry - check if input content already exists in notes
      if (notesParsed.some((item: Note) => item.note === content)) {
        // content already exists, show alert for identical entries
        alert('This note appears in your note list already');
        return;
      }

      // content is new, add new note
      const newNote = {
        note: content,
        date: currentDate,
      };
      notesParsed.push(newNote);
    }

    window.localStorage.setItem('notes', JSON.stringify(notesParsed));

    // redirect to notes list and refresh
    router.push('/');
  }

  async function handleDelete(content: string) {
    const storage = window.localStorage.getItem('notes') as string;
    const existingNotes: Note[] = JSON.parse(storage) || [];
    const filteredNotes = existingNotes.filter((item) => item.note !== content);
    window.localStorage.setItem('notes', JSON.stringify(filteredNotes));

    // redirect to notes list and refresh
    router.push('/');
  }

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Note-Taking Simplified </h1>
      <div className="container">
        <div className="row gx-5 d-flex justify-content-center">
          <div className="col col-auto mt-5 mb-5 ">
            <div className="form-floating ">
              <input
                className="form-control"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="New Note"
              />
              <label className="form-label">
                Write/Edit Note Here
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ marginLeft: '5px' }}
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-center ">
            <button
              onClick={handleSave}
              className="btn btn-outline-success btn-lg mx-2"
            >
              Save
            </button>
            <button
              onClick={() => handleDelete(content)}
              className="btn btn-outline-danger btn-lg mx-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Link href="/">
          <button type="button" className="btn btn-info btn-lg">
            My Notes List
          </button>
        </Link>
      </div>
      <div className={styles.container}>
        <img src="/sticky.jpeg" alt="clocks image" className={styles.image} />
      </div>
    </div>
  );
}
