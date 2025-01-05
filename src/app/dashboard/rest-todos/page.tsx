import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Rest Todos Page",
  description: "Rest Todos Page",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div className="space-y-4">
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
