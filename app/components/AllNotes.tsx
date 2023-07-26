'use client';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../../app/page.module.scss';
import Search from './Search';

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

  // Filter the notes from storage based on search input
  const filteredNotes = data.filter((item) =>
    item.note.toLowerCase().includes(searchString.toLowerCase()),
  );
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>My Notes</h1>
      <h5 className={styles.instruction}>
        {' '}
        Cick on note to edit, save or delete.
      </h5>

      <Search
        searchString={searchString}
        handleSearchChange={handleSearchChange}
      />
      {/* // if no search input */}
      {searchString === '' ? (
        data.length === 0 ? (
          <div className="row justify-content-center">No notes available</div>
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
      ) : // if no matches for search input
      filteredNotes.length === 0 ? (
        <div className="row justify-content-center">No notes available</div>
      ) : (
        // show filtered notes
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
      <div className="d-flex justify-content-center mt-5">
        <Link href="/new">
          <button className="btn btn-info btn-lg">Add a Note</button>
        </Link>
      </div>
      <div className={styles.container}>
        <img src="/sticky.jpeg" alt="clocks image" className={styles.image} />
      </div>
    </div>
  );
}
