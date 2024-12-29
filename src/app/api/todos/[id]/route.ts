import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string):Promise<Todo | null > => {
    const todo = await prisma.todo.findFirst({ where: { id:id } });
    return todo;
}

export async function GET(request: Request, { params }: Segments) {
 
    const todo = await getTodo(params.id);

    if (!todo) {
        return NextResponse.json({error: 'No se encontró el id ${id}'}), {status: 404};
    }

    return NextResponse.json(todo);
}

const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
});

export async function PUT(request: Request, {params}: Segments){
    const todo = await getTodo(params.id);

    if (!todo) {
        return NextResponse.json({message:`Todo con id ${params.id} no existe`}, {status: 404});
    }

    try {
        const { description, complete } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: { id: params.id },
            data: {
                description,
                complete,
            },
        });

        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json( { error } , { status: 400 });
    }
}


