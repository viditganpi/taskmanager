import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {userId} = auth();
        if(!userId) {
            return NextResponse.json({error: "Unauthorized", status: 401});
        }
        const {title, description, completed, important, date} = await req.json();
        if(!title || !description || !date) {
            return NextResponse.json({error: "Missing info"}, {status: 400});
        }

        if(title.length < 3){
            return NextResponse.json({error: "Title must be at least 3 characters long"}, {status: 400});
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                isCompleted: completed || false,
                isImportant: important || false,
                date,
                userId
            }
        });
        return NextResponse.json(task);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        // console.log(e);
        return NextResponse.json({ error: "Error creating task" }, { status: 500 });
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
    try {
        const {userId} = auth();
        if(!userId) {
            return NextResponse.json({error: "Unauthorized", status: 401});
        }
        const tasks = await prisma.task.findMany({
            where: {
                userId
            }
        });
        // console.log("From db call ", tasks);
        return NextResponse.json(tasks);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        // console.log(e);
        return NextResponse.json({ error: "Error getting task" }, { status: 500 });
    }
}


export async function PUT(req: Request) {
    try {
		const {userId} = auth();
		const {id, isCompleted} = await req.json();
		if(!userId) {
			return NextResponse.json({error: "Unauthorized", status: 401});
		}
		if(!id) {
			return NextResponse.json({error: "Missing info"}, {status: 400});
		}
		const task = await prisma.task.update({
			where: {
				id
			},
			data: {
				isCompleted
			}
		});
		return NextResponse.json(task);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        // console.log(e);
        return NextResponse.json({ error: "Error updating task" }, { status: 500 });
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(req: Request) {
    try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        // console.log(e);
        return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
    }
}