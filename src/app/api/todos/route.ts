import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  // Extrae los parámetros de búsqueda de la URL de la solicitud
  const { searchParams } = new URL(request.url);

  // Obtiene el parámetro 'take' de los parámetros de búsqueda, o usa 10 como valor predeterminado
  const take = Number(searchParams.get("take") ?? "10");

  // Obtiene el parámetro 'skip' de los parámetros de búsqueda, o usa 0 como valor predeterminado
  const skip = Number(searchParams.get("skip") ?? "0");

  // Verifica si 'take' es un número válido
  if (isNaN(take)) {
    return NextResponse.json({ error: "Take debe ser un número" });
  }

  // Verifica si 'skip' es un número válido
  if (isNaN(skip)) {
    return NextResponse.json({ error: "Skip debe ser un número" });
  }

  // Recupera los registros de la tabla 'todo' en la base de datos con paginación
  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  });

  return NextResponse.json(todos);
}

// Define un esquema de validación para los datos de la solicitud POST usando Yup
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json(
      { error: "Usuario no autenticado" },
      { status: 401 }
    );
  }

  try {
    // Valida y extrae los datos del cuerpo de la solicitud según el esquema definido
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    // Crea un nuevo registro en la tabla 'todo' en la base de datos con los datos proporcionados
    const todo = await prisma.todo.create({
      data: {
        description,
        complete,
        userId: user.id,
      },
    });

    // Devuelve el registro creado en formato JSON como respuesta
    return NextResponse.json(todo);
  } catch (error) {
    // Si hay un error en la validación o creación, devuelve un error 400 con el mensaje de error
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json(
      { error: "Usuario no autenticado" },
      { status: 401 }
    );
  }

  try {
    await prisma.todo.deleteMany({
      where: { complete: true, userId: user.id },
    });
    // Devuelve una respuesta exitosa con un mensaje
    return NextResponse.json({ message: "Todos Completados borrados" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
