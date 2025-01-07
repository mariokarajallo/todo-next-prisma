"use client";
import { Todo } from "@prisma/client";
import { TodoItem } from "@/todos";
// import * as todosApi from "@/todos/helpers/todo";
import { useRouter } from "next/navigation";
import { toggleTodo } from "../actions/todo-actions";

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter();
  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updateTodo = await todosApi.updateTodo(id, complete);
  //   console.log(updateTodo);
  //   router.refresh();
  // };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
