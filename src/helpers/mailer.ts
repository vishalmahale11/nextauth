import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "Reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", //❌ PUT IT IN THE .ENV FILE
      port: 2525, //❌ PUT IT IN THE .ENV FILE
      auth: {
        user: "6acb339081daf9", // ❌ PUT IT IN THE .ENV FILE
        pass: "e2e81300193258", // ❌ PUT IT IN THE .ENV FILE
      },
    });

    const mailOptions = {
      from: "vishal@hoeysys.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Forgot Password",
      html: `<p>Click here<a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"></a> to  ${
        emailType === "VERIFY" ? "Verify your Email" : "Reset Your Password"
      } or copy and paste the link below in your browser
      <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
