"use client";

import Workspace from "./_components/Workspace/Workspace";
import { Problem } from "@/utils/types/problem";
import React from "react";
import Topbar from "@/app/(code-judge)/problems/[problemId]/_components/Topbar/Topbar";
import {useParams} from "next/navigation";
import {problems} from "@/utils/problems";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
    const { problemId } = useParams(); // Получаем ID из URL
    const foundProblem = problems[problemId as string]; // Ищем проблему по ID

    if (!foundProblem) {
        return <div className="text-center mt-10 text-red-500">❌ Задача не найдена</div>;
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
      <Topbar problemPage/>
      <Workspace problem={foundProblem}/>
    </div>
  );
};
export default ProblemPage;