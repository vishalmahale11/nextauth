import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); // REQUIRED TO AWAIT THE RESPONSE OF THE REQUEST BODY BECAUSE NEXT JS RUNS ON THE EDGE RUNTIME IT IS TAKE THE TIME TO HANDLE REQEST RESPONSE IN THE EXPRESS IT IS HANDLE BEHIND THE SCENE NOT REQUIRED EVERY TIME AWAIT THE REQUEST BODY RESPONSE TO AWAIT AT ALL
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User ALready Exits" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // SEND VERIFIACTION EMAIL //
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message: "User Registered Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
