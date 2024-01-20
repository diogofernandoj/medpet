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
  UsersIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
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
      label: "Clientes",
      route: "/clients",
      icon: <UsersIcon size={24} />,
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
    <div className="h-20 w-full bg-white fixed bottom-0 right-0 left-0 lg:h-full lg:w-80 lg:right-auto border-t-2 lg:border-t-0 lg:border-r-2 border-solid border-gray-100">
      <div className="w-max mx-auto p-4 hidden lg:block">
        <Image
          src="/medpet.svg"
          alt="Logotipo Medpet"
          height={0}
          width={0}
          sizes="100vw"
          className="h-20 w-auto"
        />
      </div>
      <div className="flex items-center w-[90%] mx-auto h-full text-gray-400 lg:flex-col lg:items-start lg:gap-4">
        {sidebarItems.map((item) => (
          <Link
            href={item.route}
            key={item.route}
            className={`flex flex-1 flex-col items-center lg:hover:bg-green-50 transition-all ease-in-out lg:hover:text-primary lg:w-full lg:py-2 lg:justify-start text-xs font-medium lg:pl-6 justify-center lg:flex-row lg:text-base lg:gap-3 lg:flex-initial ${
              pathname === item.route &&
              "text-primary lg:bg-green-50 lg:after:w-1 lg:after:h-full lg:after:bg-primary lg:after:absolute lg:relative lg:after:left-0"
            } ${item.route === "/settings" && "hidden lg:flex"}`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
        <Popover>
          <PopoverTrigger className="flex flex-col items-center gap-1 text-xs font-medium justify-center flex-1 lg:hidden">
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
      <button
        className="lg:flex items-center gap-2 hidden text-sm text-red-400 absolute bottom-6 left-8 font-medium"
        onClick={handleSignOutClick}
      >
        <LogOutIcon size={18} /> Sair
      </button>
    </div>
  );
};

export default Sidebar;
