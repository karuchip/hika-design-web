import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  try{
    const {name, email, message} = await req.json();

    if(!name || !email || !message) {
      return NextResponse.json({error: "Missing fields"}, {status: 400});
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "hkr.12karu@gmail.com",
      subject: "お問合せが届きました hika-dev-design",
      html: `
        <h2>お問合せ内容</h2>
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メール:</strong> ${email}</p>
        <p><strong>内容:</strong><br/>${message}</p>
      `,
    })

    return NextResponse.json({success: true});
  }catch(error) {
    return NextResponse.json({error: "Error sending email"}, {status: 500})
  }
}
