import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

export const metadata = {
  title: "Serve Todos Page",
  description: "Serve Todos Page",
};

export default async function ServeTodosPage() {
  const user = await getUserSessionServer();
  console.log("user", user);

  if (!user) {
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });
  console.log("construido");

  return (
    <div className="space-y-4">
      <span className="text-3xl">Server Actions</span>
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
