import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

async function fetchInterpretations() {
  try {
    const data = await prisma.datas.findMany(); // Mengambil semua data dari tabel `datas`
    return data;
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
    await prisma.datas.create({
      data: {
        term: data.term,
        interpretation: data.interpretation,
      },
    });
    return { success: true, message: "Interpretation created successfully" };
  } catch (error: any) {
    if (error.code === 'P2002') { // Prisma duplicate key error
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
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  try {
    const interpretations = await prisma.datas.findMany({
      skip: offset,
      take: limit,
    });

    const totalItems = await prisma.datas.count();
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      data: interpretations,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
