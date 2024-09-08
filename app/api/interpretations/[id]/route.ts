import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function fetchById(id: string) {
  try {
    const data = await sql`SELECT * FROM datas where id = ${id}`;
    return data;
  } catch (error) {
    console.error("failed to fetch data id:", id, error);
    throw new Error("failed to fetch data");
  }
}

async function editById(
  id: string,
  data: { term: string; interpretation: string }
) {
  try {
    await sql`
            UPDATE datas
            SET term = ${data.term}, interpretation = ${data.interpretation}
            WHERE id = ${id}
        `;
    return { success: true, message: "Interpretation created successfully" };
  } catch (error: any) {
    if (error.code === "23505") {
      // Duplicate key error
      console.error("Duplicate entry detected for term:", data.term);
      return {
        success: false,
        message: `Interpretation for term '${data.term}' already exists`,
      };
    }
    console.error("Error creating interpretation:", error);
    throw new Error("Failed to create interpretation");
  }
}

async function deleteById(id: string) {
  try {
    await sql`DELETE FROM datas WHERE id = ${id}`;
  } catch (error) {
    return {
      message: "failed to delete data",
      error,
    };
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetchById(params.id);
    return NextResponse.json(response.rows);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await deleteById(params.id); // Logika penghapusan di sini
  
      // Return sukses response
      return NextResponse.json({ message: 'Delete successful' });
    } catch (error) {
      // Return error response
      return NextResponse.json(
        { message: 'Delete failed', error },
        { status: 500 }
      );
    }
  }

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    if (!data.term || !data.interpretation) {
      return NextResponse.json(
        { error: "Term and interpretation are required" },
        { status: 400 }
      );
    }

    const result = await editById(params.id, data);
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
