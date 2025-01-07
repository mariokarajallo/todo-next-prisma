export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Rest Todos Page",
  description: "Rest Todos Page",
};

export default async function ServeTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  console.log("construido");

  return (
    <div className="space-y-4">
      <span className="text-3xl">Server Actions</span>
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
