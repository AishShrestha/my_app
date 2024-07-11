import { NextRequest, NextResponse } from 'next/server';

const prisma = require('../../../prisma/prismaClient');



export async function GET(req: NextRequest) {

    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to get users' }, { status: 500 });
    }


}