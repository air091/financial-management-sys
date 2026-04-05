import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

type LoginCredentials = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();
    const { email, password } = body;

    if (!email || !password)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    return NextResponse.json(
      { message: "User logged in successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
