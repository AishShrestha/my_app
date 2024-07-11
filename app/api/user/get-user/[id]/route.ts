import { NextRequest, NextResponse } from "next/server";
const prisma = require('../../../../../prisma/prismaClient');

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        if (user) {
            return NextResponse.json(user);
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }

}
