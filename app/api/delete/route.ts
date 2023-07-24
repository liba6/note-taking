import { NextRequest, NextResponse } from 'next/server';
import { deleteByContent } from '../../../database/delete ';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // delete from database
  await deleteByContent(body);

  // return confirmation
  return NextResponse.json('Content deleted');
}
