import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({
        error: "User Not Available",
      });
    }
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
