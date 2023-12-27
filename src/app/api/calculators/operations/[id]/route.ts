
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

export async function POST(request: Request) {
  try {
    // Read the JSON file using fs
    const body = await request.json();
    const requestUrl = new URL(request.url);

    // Read the JSON file using fs
    const filePath = path.join(process.cwd(), "public", `/data/${body.collectionName}.json`);
    const rawData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(rawData);
    let filteredResults:any = []
    filteredResults = Object.values(data).map((d:any) => {
      const res = body.fields.map((f:any) => d[f])
      return Array.from(new Set<any>(res))
    })
    filteredResults = Array.from(new Set<any>(filteredResults.flat()))
    return NextResponse.json({
      data: filteredResults,
      status: "Success",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
