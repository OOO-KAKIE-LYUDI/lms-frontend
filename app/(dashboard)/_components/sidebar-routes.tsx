"use client";

import { Layout, Compass, Code, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const STUDENTRoutes = [
    {
        icon: Layout,
        label: "Мои курсы",
        href: "/",
    },
    {
        icon: Compass,
        label: "Доступные курсы",
        href: "/search",
    },
    {
        icon: Code,
        label: "Code Judge",
        href: "/code-judge",
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Курсы",
        href: "/teacher/courses",
    },
/*    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
    {
        icon: Users,
        label: "Manage Users",
        href: "/teacher/users",
    }*/
]


export const SidebarRoutes = () => {

    const pathname = usePathname();
    
    const isTeacherPage = pathname?.startsWith("/teacher");

    const routes = isTeacherPage ? teacherRoutes : STUDENTRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route, index) => (
                <SidebarItem 
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}            
        </div>
    )
}