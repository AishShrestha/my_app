import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaClient";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();
    const { email, name } = body;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Build the data object conditionally
        const data: { email?: string; name?: string } = {};
        if (email) data.email = email;
        if (name) data.name = name;

        if (Object.keys(data).length === 0) {
            return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data,
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}