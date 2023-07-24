'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../app/page.module.scss';

export type Note = {
  note: string;
  date: string;
};
export default function Notes() {
  const [data, setData] = useState<Note[]>([]);
  // const [content, setContent] = useState('');

  useEffect(() => {
    function fetchData() {
      const notes = window.localStorage.getItem('notes');
      const parsedNotes = notes ? (JSON.parse(notes) as Note[]) : [];
      setData(parsedNotes);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.div}>
      <h1>Note-Taking. Simplified</h1>
      <label>
        {' '}
        Search Notes
        <input />
      </label>
      <h3>To update, simply click on your note, edit and save.</h3>
      <h2> Notes:</h2>

      {data.length === 0 ? (
        <div>No notes available</div>
      ) : (
        data.map((item) => (
          <Link href={`/new?note =${item.note}`}>
            <div key={item.note}>
              <p>
                {item.note} {item.date}
              </p>
            </div>
          </Link>
        ))
      )}
      <Link href="/new">
        <button>Add a Note</button>
      </Link>
    </div>
  );
}
