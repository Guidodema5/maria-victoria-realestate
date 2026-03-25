import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Login page renders without the admin shell — middleware handles the redirect
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-64 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
