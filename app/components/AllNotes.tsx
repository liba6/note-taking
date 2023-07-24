'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../app/page.module.scss';

export default function Notes() {
  const [data, setData] = useState([]);
  // const [content, setContent] = useState('');

  useEffect(() => {
    function fetchData() {
      const notes = window.localStorage.getItem('notes');
      const parsedNotes = JSON.parse(notes) || [];
      setData(parsedNotes);
    }
    fetchData();
  }, []);

  // function handleClick(content: string) {
  //   setContent(content);
  // }
  return (
    <div className={styles.div}>
      <h1>Note-Taking. Simplified</h1>
      <label>
        {' '}
        Search Notes
        <input />
      </label>
      <h2>Previous Notes:</h2>
      {data.length === 1 ? (
        <div>No notes available</div>
      ) : (
        data.map((item) => (
          <Link href={`/new?note =${item.note}`}>
            <div
              key={item.note}
              // onClick={() => handleClick(item.content)}
            >
              <p>
                {item.note} {item.date}
              </p>
            </div>
          </Link>
        ))
      )}
      <Link href="/new  ">
        <button>Add a Note</button>
      </Link>
    </div>
  );
}
