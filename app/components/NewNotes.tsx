'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewNotes() {
  const [content, setContent] = useState('');
  const router = useRouter();

  async function handleSave() {
    // send content to api to insert into database

    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });

    const data = await response.json();
    // alert(data);
    if (data) {
      router.push('/');
      router.refresh();
    }
  }
  return (
    <div>
      <h1>Note Edits Page</h1>
      <label>
        New Note
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
      </label>
      <button onClick={handleSave}> Save</button>
      <button>Delete</button>
      <hr />
      <Link href="/..">
        <button>Back to Notes List</button>
      </Link>
    </div>
  );
}
