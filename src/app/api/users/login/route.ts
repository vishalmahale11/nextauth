import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User Not Exists" }, { status: 400 });
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Password Wrong" }, { status: 400 });
    }
    const tokenData = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };
    const token = Jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET || "chaiaurcode",
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json({
      message: "Logged In Successfull",
      sucess: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
