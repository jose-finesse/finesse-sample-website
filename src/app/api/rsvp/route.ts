import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "rsvps.json");

interface RSVP {
  name: string;
  email: string;
  instagram: string;
  plusOne: string;
  timestamp: string;
}

async function readRSVPs(): Promise<RSVP[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, instagram, plusOne } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const rsvps = await readRSVPs();

    const existing = rsvps.find(
      (r) => r.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      return NextResponse.json({ message: "Already registered" });
    }

    const newRSVP: RSVP = {
      name,
      email,
      instagram: instagram || "",
      plusOne: plusOne || "",
      timestamp: new Date().toISOString(),
    };

    rsvps.push(newRSVP);
    await fs.writeFile(DATA_FILE, JSON.stringify(rsvps, null, 2));

    return NextResponse.json({ message: "RSVP confirmed" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const rsvps = await readRSVPs();
  return NextResponse.json({ count: rsvps.length, rsvps });
}
