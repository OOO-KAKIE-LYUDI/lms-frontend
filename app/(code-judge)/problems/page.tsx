"use client";

import React, { useState } from "react";
import { ProblemsTable } from "@/app/(code-judge)/problems/[problemId]/_components/ProblemsTable/ProblemsTable";
import { Navbar } from "@/app/(dashboard)/_components/navbar";
import { Sidebar } from "@/app/(dashboard)/_components/Sidebar";
import { ToastContainer } from "react-toastify";

const ProblemsPage = () => {
  const [loadingProblems, setLoadingProblems] = useState(true);

  return (
    <div className="h-full ">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 ">
        <Navbar/>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ">
        <Sidebar/>
      </div>
      <div className="md:pl-56 pt-[80px] h-full">
        <main className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Coding Problems</h1>
          <ProblemsTable setLoadingProblems={setLoadingProblems}/>
        </main>
      </div>
    </div>

  )
    ;
};

export default ProblemsPage;