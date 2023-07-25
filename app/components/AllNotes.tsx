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
      <h5 className={styles.instruction}>
        {' '}
        Cick on note to edit, save or delete.
      </h5>

      <div className="row justify-content-center m-5 ">
        <div className="col col-auto ">
          <div className="form-floating">
            <input
              className="form-control "
              placeholder="Search Notes"
              value={searchString}
              onChange={handleSearchChange}
            />
            <label className="form-label ">
              {' '}
              Search Notes
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ marginLeft: '5px' }}
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </label>
          </div>
        </div>
      </div>

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
