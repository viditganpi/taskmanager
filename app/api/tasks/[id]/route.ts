import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: { params : { id: string } }) {
    try {
		const {id} = params;
        const {userId} = auth();
		if(!userId) {
			return NextResponse.json({error: "Unauthorized", status: 401});
		}
        
        const tasks = await prisma.task.delete({
            where: {
				id
            }
        });
        console.log("Deleted task ", tasks);
        return NextResponse.json(tasks);
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Error getting task" }, { status: 500 });
    }
}
