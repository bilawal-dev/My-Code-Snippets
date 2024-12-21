import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import SnippetsModel from "@/db/models/SnippetsSchema";
import connectToDB from "@/db/connectToDB";

export async function POST(req: Request) {
    try {
        const { title, description, language, code, tags } = await req.json();

        if (!title || !description || !language || !code) {
            return NextResponse.json({ success: false, message: 'Missing Fields!' }, { status: 400 });
        }

        const session: any = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectToDB();

        const userSnippet = await SnippetsModel.findOne({ userId });

        if (userSnippet) {    
            const newSnippets = [...userSnippet.snippets, { title, description, code, language, tags}];
            
            const newUserSnippets = await SnippetsModel.findByIdAndUpdate(userSnippet._id, {
                snippets: newSnippets
            }) 
    
            return NextResponse.json({ success: true, message: 'Code Snippet Added', userSnippets: newUserSnippets }, { status: 200 });
        }

        // Create a new user snippet document if it doesn't exist
        const newUserSnippet = await SnippetsModel.create({
            userId,
            snippets: [{ title, description, code, language }],
            tags : [],
        });

        return NextResponse.json({ success: true, message: 'Code Snippet Added', userSnippets: newUserSnippet }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}