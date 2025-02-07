"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import codeIcon from "@/public/code-icon.png";
import { useUser } from "@clerk/nextjs";
import { Timer } from "lucide-react";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const { user } = useUser();

  return (
      <nav className='relative flex h-[70px] w-full shrink-0 items-center px-5 text-dark-gray-7'>
        <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
          <Link href='/' className='flex items-center'>
            <Image src={codeIcon} alt='Logo' height={40} width={40}/>
            <span className='text-zinc-800 ml-2 text-lg font-semibold'>C.O.D.E</span>
          </Link>
          <div className='flex items-center space-x-4 flex-1 justify-end'>
            {!user && (
                <Link href='/auth'>
                  <button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded '>Sign In</button>
                </Link>
            )}
            {user && problemPage && <Timer />}
            {user && (
                <div className='cursor-pointer group relative'>
                  <Image src={user.imageUrl} alt='Avatar' width={30} height={30} className='rounded-full'/>
                  <div className='absolute top-10 left-2/4 -translate-x-2/4 bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out'>
                    <p className='text-sm'>{user.emailAddresses[0].emailAddress}</p>
                  </div>
                </div>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Topbar;
