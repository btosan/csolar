import { db } from '@/lib/db'
import { NextResponse } from "next/server";
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ email: string }> }
  ) {
    try {
      const { email } = await params;
      const user = await db.user.findUnique({ where: { email } });
      return NextResponse.json(user);
    } catch (error) {
      // console.log(error);
      return NextResponse.json({ message: "Could not fetch user" });
    }
  }
  
  export async function PUT(
    req: Request,
    { params }: { params: Promise<{ email: string }> }
  ) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    // const { title, content, selectedCategory,tags, imageUrl, image2Url, publicId } =
    const { role } =
      await req.json();
    const { email } = await params;
  
    try {
      const user = await db.user.update({
        where: { email },
        data: {
          role
        },
        select: {
          role: true, 
      },

      });
  
      return NextResponse.json(user);
    } catch (error) {
      // console.log(error);
      return NextResponse.json({ message: "Error editing profile" });
    }
  }
  
  export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ email: string }> }
  ) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
  
    const { email } = await params;
    try {
      const user = await db.user.delete({ where: { email } });
      return NextResponse.json(user);
    } catch (error) {
      // console.log(error);
      return NextResponse.json({ message: "Error deleting the user" });
    }
  }
  
