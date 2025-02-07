"use client"

import React from "react";
import Workspace from "./_components/Workspace/Workspace";
import Topbar from "@/app/(code-judge)/problems/[problemId]/_components/Topbar/Topbar";
import { useParams } from "next/navigation";
import { problems } from "@/utils/problems";

const ProblemPage: React.FC = () => {
  const { problemId } = useParams();
  const foundProblem = problems[problemId as string];

  if (!foundProblem) {
    return <div className="text-center mt-10 text-red-500">❌ Problem not found</div>;
  }

  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0
    }}>
      <Topbar problemPage />
      <Workspace problem={foundProblem} />
    </div>
  );
};

export default ProblemPage;