import { NextApiRequest, NextApiResponse } from 'next';
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

export async function GET(req: NextRequest) {

    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to get users' }, { status: 500 });
    }


}