import React from "react";
import { Problem } from "@/utils/types/problem";
import ProblemPageClient from "@/app/(code-judge)/problems/[problemId]/_components/ProblemPageClient";

async function fetchProblem(problemId: string): Promise<Problem | null> {
  try {
    const response = await fetch(`http://localhost:8088/api/algo/problems/${problemId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch problem");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch problem:", error);
    return null;
  }
}

export default async function ProblemPageServer({ params }: { params: { problemId: string } }) {
  const problem = await fetchProblem(params.problemId);

  if (!problem) {
    return <div>Problem not found</div>;
  }

  return <ProblemPageClient problem={problem} />;
}