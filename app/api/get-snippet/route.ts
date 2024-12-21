import connectToDB from "@/db/connectToDB";
import SnippetsModel from "@/db/models/SnippetsSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";

export async function GET() {
    const session: any = await getServerSession(authOptions);

    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 400 });
    }

    try {
        await connectToDB();

        const userSnippets = await SnippetsModel.find({ userId });

        if (userSnippets.length === 0) {
            return NextResponse.json({ success: false, userSnippets: [], message: 'No Snippets Found In Record' }, { status: 400 });
        }

        return NextResponse.json({ success: true, userSnippets: userSnippets[0], message: 'Successfully Fetched Snippets' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, userSnippets: [], message: 'Interval Server Error' }, { status: 400 });
    }
} 