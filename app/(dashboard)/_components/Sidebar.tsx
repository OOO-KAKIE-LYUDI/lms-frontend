"use client";

import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {

    return (
        <div className={`h-full border-r flex flex-col overflow-y-auto text-black shadow-sm bg-zinc-100`}>
        <div className="p-6 font-bold">
            PinkHat LMS
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    )
}