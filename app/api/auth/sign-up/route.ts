import connectToDB from "@/db/connectToDB";
import userAuthModel from "@/db/models/UserAuthSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password || !confirmPassword) {
        return NextResponse.json({ success: false, message: 'Email And Password Fields Missing!' }, { status: 400 });
    }

    if (password !== confirmPassword) {
        return NextResponse.json({ success: false, message: 'Passwords Do Not Match!' }, { status: 400 });
    }

    if (password.length < 8) {
        return NextResponse.json({ success: false, message: 'Passwords Length Must Be Greater Than 8 Characters!' }, { status: 400 });
    }

    try {
        await connectToDB();

        const existingUser = await userAuthModel.find({ email });

        if (existingUser.length > 0) {
            return NextResponse.json({ success: false, message: 'User With This Email Already Exists!' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await userAuthModel.create({
            name,
            email,
            password: hashedPassword,
        })
        
        return NextResponse.json({ success: true, message: 'User Registered' }, { status: 200 });

    } catch (error) {
        console.log('API_ERROR', error);
        return NextResponse.json({ success: false, message: 'Something Went Wrong!' }, { status: 500 });
    }
}