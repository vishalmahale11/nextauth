import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: new Date(Date.now()) },
    });
    if (!user) {
      return NextResponse.json(
        { error: "User token Not found" },
        { status: 400 }
      );
    }
    (user.isVerified = true),
      (user.verifyToken = undefined),
      (user.verifyTokenExpiry = undefined),
      await user.save();
    return NextResponse.json(
      { message: "User Token Verified" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
