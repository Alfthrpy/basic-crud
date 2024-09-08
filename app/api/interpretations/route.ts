import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function fetchInterpretations() {
  try {
    const data = await sql`SELECT * FROM datas`;
    return data.rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch interpretations");
  }
}

async function createInterpretation(data: {
  term: string;
  interpretation: string;
}) {
  try {
    await sql`INSERT INTO datas (term, interpretation) VALUES (${data.term}, ${data.interpretation})`;
    return { success: true, message: "Interpretation created successfully" };
  } catch (error: any) {
    if (error.code === '23505') { // Duplicate key error
      console.error("Duplicate entry detected for term:", data.term);
      return { success: false, message: `Interpretation for term '${data.term}' already exists` };
    }
    console.error("Error creating interpretation:", error);
    throw new Error("Failed to create interpretation");
  }
}

// POST handler: Create new interpretation
export async function POST(req: Request) {
  try {
    const { term, interpretation } = await req.json();

    if (!term || !interpretation) {
      return NextResponse.json(
        { error: "Term and interpretation are required" },
        { status: 400 }
      );
    }

    const result = await createInterpretation({ term, interpretation });

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 409 } // Conflict, duplicate term
      );
    }

    return NextResponse.json({ message: result.message }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create interpretation" },
      { status: 500 }
    );
  }
}

// GET handler: Fetch all interpretations
export async function GET() {
  try {
    const interpretations = await fetchInterpretations();
    return NextResponse.json(interpretations, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to get interpretations" },
      { status: 500 }
    );
  }
}
