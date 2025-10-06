// app/dashboard/page.tsx (server component)
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const payload = token ? verifyJwt(token as string) : null;

  if (!payload) {
    redirect("/auth/login");
  }

  // render protected content...
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
      <h1 className="text-2xl text-black">Welcome to your Dashboard</h1>
    </div>
  );
}