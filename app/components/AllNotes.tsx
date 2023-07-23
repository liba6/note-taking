import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../app/page.module.scss';
import { getAllNotes } from '../../database/notes';

export function AllEntries() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allData = await getAllNotes();
      setData(allData);
    }
    fetchData();
  }, []);

  console.log('allContent', data);
  return (
    <div className={styles.div}>
      <h1>Note-Taking. Simplified</h1>
      <label>
        {' '}
        Search Notes
        <input />
      </label>
      <h2>Previous Notes:</h2>
      {data.length < 1 ? (
        <div>No notes available</div>
      ) : (
        data.map((item) => (
          <div key={item.id}>
            <p>{item.content}</p>
            <p> {new Date(item.date).toLocaleString()}</p>
          </div>
        ))
      )}
      <Link href="/../edits">
        <button>Add a Note</button>
      </Link>
    </div>
  );
}
