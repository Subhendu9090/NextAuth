import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //console.log("inside send mail",email, emailType, userId);

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "80def0854a6ac8", // no
        pass: "b720ef394811eb", // no
      },
      
    });

    const mailoption = {
      from: "subhendu@subhendu.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : " reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"here</a> to ${
        emailType === "VERIFY" ? "verify your mail" : "reset your password"
      } or copy and paste the link below in your browser 
            <br> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
            </p>`,
    };

    const mailResponse = await transport.sendMail(mailoption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.messege);
  }
};
