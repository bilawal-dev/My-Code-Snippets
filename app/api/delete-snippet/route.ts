import connectToDB from "@/db/connectToDB";
import SnippetsModel from "@/db/models/SnippetsSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { ISnippet } from "@/app/my-snippets/page";

export async function POST(req: Request) {
    const session: any = await getServerSession(authOptions);

    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 400 });
    }

    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ success: false, message: 'ID Of Snippet To Delete Missing' }, { status: 400 });
    }

    try {
        await connectToDB();

        const [userSnippet] = await SnippetsModel.find({ userId });

        userSnippet.snippets = userSnippet.snippets.filter((snippet: ISnippet) => snippet._id != id);

        const data = await SnippetsModel.findByIdAndUpdate(userSnippet._id, {
            snippets: userSnippet.snippets
        });

        return NextResponse.json({ success: true, message: 'Snippet Added To Favourites' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 400 });
    }
} 