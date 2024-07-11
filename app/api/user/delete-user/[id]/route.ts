import { NextRequest, NextResponse } from "next/server";

const prisma = require('../../../../../prisma/prismaClient');




export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ deletedUser });

    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}