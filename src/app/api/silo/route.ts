import { updateData } from "@/lib/handler/silo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await updateData();
    return NextResponse.json({ message: "SILO data updated successfully." });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to update SILO data." },
      { status: 500 },
    );
  }
}
