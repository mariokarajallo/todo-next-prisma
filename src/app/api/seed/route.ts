import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

// Define una función asíncrona GET que maneja las solicitudes GET
export async function GET(request: Request) {
  // Elimina todos los registros de la tabla 'todo' en la base de datos
  await prisma.todo.deleteMany(); // delete * from todo
  await prisma.user.deleteMany(); // delete * from user

  // // Crea múltiples registros en la tabla 'todo' con los datos proporcionados
  // await prisma.todo.createMany({
  //    data: [
  //     {description: 'Learn React', complete: true},
  //     {description: 'Learn Next.js' },
  //     {description: 'Learn TypeScript' },
  //     {description: 'Learn Prisma'},
  //    ]
  // });

  // Crea un registro en la tabla 'user' con los datos proporcionados
  const user = await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin, superadmin"],
      todos: {
        create: [
          { description: "Learn React", complete: true },
          { description: "Learn Next.js" },
          { description: "Learn TypeScript" },
          { description: "Learn Prisma" },
        ],
      },
    },
  });

  // Devuelve una respuesta JSON con un mensaje indicando que la semilla se ejecutó
  return NextResponse.json({ message: "sedd executed" });
}
