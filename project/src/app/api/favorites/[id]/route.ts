// NextRequest for input & NextResponse for replies
import { NextRequest, NextResponse } from 'next/server';
import data from '../../../../../data.json';

// defines GET request
export async function GET(
  request: NextRequest, //params contains dynamic route values
  { params }: { params: { id: string } } //gives actual ID from URL
) {
    // matches params.id to id in favorites array
  const item = data.favorites.find(fav => fav.id === params.id);

  // returns value if found
  if (item) {
    return NextResponse.json(item);
  } 
  // if item not found return 404 item not found
  else {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
  }
}
