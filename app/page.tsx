'use client';

import { AllEntries } from './components/AllNotes';

export default async function Notes() {
  return (
    <div>
      <h1>Welcome</h1>
      <AllEntries />
    </div>
  );
}
