import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function fetchById(id: string) {
  try {
    const data =await prisma.datas.findUnique({
      where: { id }, // Menentukan id sebagai parameter query
    });
    return data;
  } catch (error) {
    console.error("failed to fetch data", error);
    throw new Error("failed to fetch data");
  }
}


async function editById(
  id: string,
  data: { term: string; interpretation: string }
) {
  try {
    await prisma.datas.update({
      where:{id},
      data: {
        term: data.term,
        interpretation: data.interpretation
      }
    })
    return { success: true, message: "Interpretation updated successfully" };
  } catch (error : any) {
    if (error.code === 'P2025') { // Error jika tidak ditemukan
      console.error("No interpretation found for the given ID:", id);
      return { success: false, message: "Interpretation not found" };
    }
    console.error("Error updating interpretation:", error);
    throw new Error("Failed to update interpretation");
  }
}

// async function deleteById(id: string) {
//   try {
//     await sql`DELETE FROM datas WHERE id = ${id}`;
//   } catch (error) {
//     return {
//       message: "failed to delete data",
//       error,
//     };
//   }
// }

async function deleteById(id: string) {
  try {
    await prisma.datas.delete({where:{id}})
  } catch (error:any) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data")
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetchById(params.id);
    console.log(response);
    return NextResponse.json(response);
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
    return NextResponse.json({ message: "Delete successful" });
  } catch (error) {
    // Return error response
    return NextResponse.json(
      { message: "Delete failed", error },
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
