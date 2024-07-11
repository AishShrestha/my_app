import { NextRequest, NextResponse } from 'next/server';
const prisma = require('../../../prisma/prismaClient');
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, name } = body;

        const user = await prisma.user.create({
            data: {
                email,
                name,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
