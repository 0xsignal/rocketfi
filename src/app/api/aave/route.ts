import { updateAaveData } from "@/lib/handler/aave";
import { NextRequest, NextResponse } from "next/server";

// API route to trigger AAVE data update
export async function GET(request: NextRequest) {
  try {
    await updateAaveData();
    return NextResponse.json({ message: "AAVE data updated successfully." });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to update AAVE data." },
      { status: 500 },
    );
  }
}
