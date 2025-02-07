'use client'

import React from "react";
import Topbar from "@/app/(code-judge)/problems/[problemId]/_components/Topbar/Topbar";
import { Problem } from "@/utils/types/problem";
import Workspace from "@/app/(code-judge)/problems/[problemId]/_components/Workspace/Workspace";

export default function ProblemPageClient({ problem }: { problem: Problem }) {
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
      <Workspace problem={problem} />
    </div>
  );
}