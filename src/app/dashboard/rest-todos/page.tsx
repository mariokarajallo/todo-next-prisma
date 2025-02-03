export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Rest Todos Page",
  description: "Rest Todos Page",
};

export default async function RestTodosPage() {
  const user = await getUserSessionServer();
  console.log("user", user);

  if (!user) {
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });

  return (
    <div className="space-y-4">
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
