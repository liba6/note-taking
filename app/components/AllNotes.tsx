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
      <h1>Note-Taking Simplified</h1>
      <label>
        {' '}
        Search Notes
        <input />
      </label>
      <h3>To update, simply click on your note, edit and save.</h3>

      {data.length === 0 ? (
        <div>No notes available</div>
      ) : (
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Note</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.note}>
                  <td>
                    <Link href={`/new?note =${item.note}`}>{item.note}</Link>
                  </td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link href="/new">
        <button>Add a Note</button>
      </Link>
    </div>
  );
}
