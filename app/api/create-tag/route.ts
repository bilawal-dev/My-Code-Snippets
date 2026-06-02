import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import SnippetsModel from "@/db/models/SnippetsSchema";
import connectToDB from "@/db/connectToDB";

export async function POST(req: Request) {
    try {
        const { tag } = await req.json();

        if (!tag) {
            return NextResponse.json({ success: false, message: 'Missing Fields!' }, { status: 400 });
        }

        const session: any = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 400 });
        }

        await connectToDB();

        const userSnippet = await SnippetsModel.findOne({ userId });

        if (userSnippet) {
            if (userSnippet.tags.includes(tag)) {
                return NextResponse.json({ success: false, message: 'Tag Already Exists' }, { status: 400 });
            }

            const newUserSnippets = await SnippetsModel.findByIdAndUpdate(userSnippet._id, {
                tags: [...userSnippet.tags, tag],
            });

            return NextResponse.json({ success: true, message: 'User Tags', userSnippets: newUserSnippets }, { status: 200 });
        }

        // Create a new user snippet document if it doesn't exist
        const newUserSnippet = await SnippetsModel.create({
            userId,
            snippets: [],
            tags: [tag],
        });

        return NextResponse.json({ success: true, message: 'New Tag Added Testing', userSnippets: newUserSnippet }, { status: 400 })


    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}