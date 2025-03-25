import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { firstName, lastName, email, program, gender, location, phone, disabled, image, description }: {
        firstName: string;
        lastName: string;
        email: string;
        program: string;
        gender: string;
        location: string;
        phone: string;
        disabled: boolean;
        image: string;
        description: string;
    } = await req.json();
    
    try {
        const newLearner = await prisma.learner.create({
            data: {
                firstName,
                lastName,
                email,
                program,
                gender,
                location,
                phone,
                disabled,
                image,
                description,
            },
        });
        return new Response(JSON.stringify(newLearner), { status: 201 });

    } catch (error) {
        console.log('Error creating Leaner', error);
        return new Response('Error creating Leaner', { status: 500 });
    }
}