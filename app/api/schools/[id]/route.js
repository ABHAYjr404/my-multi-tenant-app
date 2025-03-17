import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const school = await db.school.findUnique({
      where: { id: parseInt(params.id, 10) },
    });
    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }
    return NextResponse.json(school);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const updatedSchool = await db.school.update({
      where: { id: parseInt(params.id, 10) },
      data,
    });
    return NextResponse.json(updatedSchool);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update school" }, { status: 500 });
  }
}
