import { NextRequest, NextResponse } from 'next/server';
import { createNewNote } from '../../../database/notes';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // insert note in notes postgres table
  const notes = createNewNote(body);

  // return confirmation
  return NextResponse.json('Note added');
}
