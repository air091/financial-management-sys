export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: RegisterCredentials = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );

    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (emailExist)
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const registeredUser = await prisma.user.create({
      data: { username, email, password: hashedPassword, profile_url: "" },
      select: {
        id: true,
        username: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: registeredUser,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
