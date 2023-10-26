
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest, context: { params: any }) {
  try {
    // Read the JSON file using fs
    const filePath = path.join(process.cwd(), 'public', `/data/${context.params.id}.json`);
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);

    return NextResponse.json({
        message: 'Data loaded successfully',
        data: data});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

