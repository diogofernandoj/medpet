"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const sidebarItems = [
    {
      label: "Dashboard",
      route: "/dashboard",
      icon: <LayoutDashboardIcon size={24} />,
    },
    {
      label: "Agenda",
      route: "/schedule",
      icon: <CalendarIcon size={24} />,
    },
    {
      label: "Perfil",
      route: "/profile",
      icon: <UserIcon size={24} />,
    },
    {
      label: "Configurações",
      route: "/settings",
      icon: <SettingsIcon size={24} />,
    },
  ];

  const handleSignOutClick = async () => {
    await signOut({
      redirect: false,
    });

    router.replace("/");
  };

  return (
    <div className="h-20 w-full bg-white fixed bottom-0 right-o left-0 shadow-md">
      <div className="flex items-center w-[90%] mx-auto justify-between h-full text-gray-300">
        {sidebarItems.map((item) => (
          <Link
            href={item.route}
            key={item.route}
            className={`flex flex-1 flex-col items-center gap-1 text-xs font-medium justify-center ${
              pathname === item.route && "text-primary "
            } ${item.route === "/settings" && "hidden lg:flex"}`}
          >
            {item.icon}
            <span className="">{item.label}</span>
          </Link>
        ))}
        <Popover>
          <PopoverTrigger className="flex flex-col items-center gap-1 text-xs font-medium justify-center flex-1">
            <MoreHorizontalIcon />
            <span>Mais</span>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-full gap-3 text-gray-500">
            <Link href="/settings" className="flex items-center gap-1 text-xs">
              <SettingsIcon size={18} /> Configurações
            </Link>
            <Separator />
            <button
              className="flex items-center gap-1 text-xs"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={18} /> Sair
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
