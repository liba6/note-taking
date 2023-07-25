'use client';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../../app/page.module.scss';

export type Note = {
  note: string;
  date: string;
};
export default function Notes() {
  const [data, setData] = useState<Note[]>([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    function fetchData() {
      const notes = window.localStorage.getItem('notes');
      const parsedNotes = notes ? (JSON.parse(notes) as Note[]) : [];
      setData(parsedNotes);
    }
    fetchData();
  }, []);

  // Function to handle search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  // Filter the notes based on search input
  const filteredNotes = data.filter((item) =>
    item.note.toLowerCase().includes(searchString.toLowerCase()),
  );
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>My Notes</h1>
      <div className="row ">
        <div className="col col-2">
          <div className="form-floating">
            <input
              className="form-control"
              placeholder="Search Notes"
              value={searchString}
              onChange={handleSearchChange}
            />
            <label className="form-label "> Search Notes</label>
          </div>
        </div>
      </div>
      <h5> Cick on note to edit, save or delete.</h5>

      {searchString === '' ? (
        // if no search input
        data.length === 0 ? (
          <div>No notes available</div>
        ) : (
          // show all notes
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
        )
      ) : filteredNotes.length === 0 ? (
        // if no matches for search input
        <div>No notes available</div>
      ) : (
        // show filtered notes based on the search input
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Note</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.map((item) => (
                <tr key={item.note}>
                  <td>
                    <Link href={`/new?note=${item.note}`}>{item.note}</Link>
                  </td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link href="/new">
        <button className={styles.btn}>Add a Note</button>
      </Link>
    </div>
  );
}
