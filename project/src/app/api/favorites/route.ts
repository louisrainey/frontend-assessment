// import next.js
import { NextResponse } from 'next/server';

// load data from data.json
import data from '../../../../data.json'; 

// defines GET request
export async function GET() {
    // returns favorite array
  return NextResponse.json(data.favorites);
}
