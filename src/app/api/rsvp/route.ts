import { NextResponse } from "next/server";
import { appendToSheet, getSheetData } from "@/lib/sheets";

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

    const existing = await getSheetData();
    const duplicate = existing.some(
      (row) => row[1]?.toLowerCase() === email.toLowerCase()
    );

    if (duplicate) {
      return NextResponse.json({ message: "Already registered" });
    }

    await appendToSheet([
      [name, email, instagram || "", plusOne || "", new Date().toISOString()],
    ]);

    return NextResponse.json({ message: "RSVP confirmed" });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await getSheetData();
    const rsvps = data.slice(1).map((row) => ({
      name: row[0] || "",
      email: row[1] || "",
      instagram: row[2] || "",
      plusOne: row[3] || "",
      timestamp: row[4] || "",
    }));

    return NextResponse.json({ count: rsvps.length, rsvps });
  } catch (error) {
    console.error("RSVP fetch error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
