import Workspace from "./_components/Workspace/Workspace";
import { Problem } from "@/utils/types/problem";
import React from "react";
import Topbar from "@/app/(code-judge)/problems/[problemId]/_components/Topbar/Topbar";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
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
      <Workspace problem={problem}/>
    </div>
  );
};
export default ProblemPage;