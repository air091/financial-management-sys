import { NextRequest, NextResponse } from "next/server";

type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
