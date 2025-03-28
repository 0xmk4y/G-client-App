import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    console.log("Signup API");
    const { firstName, lastName, email, password, confirmPass } = await req.json();

    if (!email || !password || !confirmPass ) {
        return new Response(
            JSON.stringify({ message: "All fields are required" }),
            { status: 400 }
        );
    }

    if (password !== confirmPass) {
        return new Response(
            JSON.stringify({ message: "Passwords do not match" }),
            { status: 400 }
        );
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists" }), {
                status: 409,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });

        const User = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
        }
        
        return new Response(JSON.stringify({ message:"User created successfull", user: User }), { status: 201 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
        });
    }
}
