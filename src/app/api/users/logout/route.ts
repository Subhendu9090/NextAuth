import { NextResponse } from "next/server";

export function GET() {
  try {
    const responce = NextResponse.json({
      message: "logged out succefully",
      success: true,
    });

    responce.cookies.set("token", "", {
      httpOnly: true,
    });
    return responce;
  } catch (error:any) {
    console.log("error in logout");
    NextResponse.json({error:error.message},{status:500})
  }
}
