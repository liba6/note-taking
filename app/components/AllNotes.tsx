'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../app/page.module.scss';
import { getAllNotes } from '../../database/notes';

export function AllNotes(props) {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');

  useEffect(() => {
    async function fetchData() {
      setData(props.allData);
    }
    fetchData();
  }, []);

  function handleClick(itemId: string) {
    setId(itemId);
    console.log('id', itemId);
  }
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
          <Link href={`/new?id =${item.id}`}>
            <div key={item.id} onClick={() => handleClick(item.id)}>
              <p>
                {item.content} {new Date(item.date).toLocaleDateString()}
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
