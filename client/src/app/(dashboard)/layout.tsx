"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Flame, MessageCircle, User, LogOut } from "lucide-react";
import { motion } from "framer";
import { useSession, signOut } from "@/lib/auth-client";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Redirect to login if not authenticated
  if (!isPending && !session) {
    router.push("/login");
    return null;
  }

  // Show nothing while loading session
  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { href: "/feed", icon: Home, label: "feed" },
    { href: "/swipe", icon: Flame, label: "swipe" },
    { href: "/matches", icon: MessageCircle, label: "matches" },
    { href: "/profile", icon: User, label: "profile" },
  ];

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="h-screen flex bg-gray-50">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white border-r p-6 z-50 flex-col">
        <h1 className="text-2xl font-semibold mb-10">
          Lumeva
        </h1>

        <nav className="space-y-3 relative flex-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className="relative flex items-center gap-3 px-4 py-2 rounded-lg"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-violet-100 rounded-lg"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <Icon
                  size={20}
                  className={`relative z-10 ${
                    isActive
                      ? "text-violet-600"
                      : "text-gray-500"
                  }`}
                />

                <span
                  className={`relative z-10 ${
                    isActive
                      ? "text-violet-700 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User info + Logout */}
        <div className="border-t pt-4 space-y-3">
          <div className="text-sm text-gray-600 truncate px-2">
            {session?.user?.name || session?.user?.email}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition px-2 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col pb-16 md:pb-0 overflow-hidden">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 md:hidden z-50">
        {navItems.map(({ href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-pill"
                  className="absolute bottom-2 h-1 w-8 bg-violet-600 rounded-full"
                  transition={{
                    type: "spring",
                      stiffness: 400,
                      damping: 30,
                  }}
                />
              )}

              <Icon
                size={24}
                className={
                  isActive
                    ? "text-violet-600"
                    : "text-gray-400"
                }
              />
            </Link>
          );
        })}
      </nav>

    </div>
  );
}