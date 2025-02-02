import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("No session");
    redirect("/api/auth/signin");
  }
  console.log(session.user);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <WidgetItem title="Usuario Conectado Server Side">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>
        </div>
      </WidgetItem>
    </div>
  );
}
