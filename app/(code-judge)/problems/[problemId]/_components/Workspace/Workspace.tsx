"use client"

import React, { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import { Problem } from "@/utils/types/problem";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);

  problem = {
    id: "two-sum",
    title: "Two Sum",
    order: 1,
    handlerFunction: "twoSum",
    starterFunctionName: "function twoSum(",
    starterCode: `function twoSum(nums: number[], target: number): number[] {
    // Write your code here
};`,
    problemStatement: `<p class=''>
Дан массив целых чисел <code>nums</code> и целое число <code>target</code>, верните индексы двух чисел таких, что их сумма равна <code>target</code>. </p> <p class='mt-3'> Можете считать, что для каждого входного набора существует <strong>ровно одно решение</strong>, и вы не можете использовать один и тот же элемент дважды. </p> <p class='mt-3'>Вы можете вернуть ответ в любом порядке.</p>`,
    examples: [
      {
        id: 1,
        inputText: "nums = [2,7,11,15], target = 9",
        outputText: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        img: ""
      },
      {
        id: 2,
        inputText: "nums = [3,2,4], target = 6",
        outputText: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
        img: ""
      },
      {
        id: 3,
        inputText: "nums = [3,3], target = 6",
        outputText: "[0,1]",
        explanation: "",
        img: ""
      }
    ],
    constraints: `<ul>
    <li><codered>2 ≤ nums.length ≤ 10</codered></li>
    <li><codered>-10 ≤ nums[i] ≤ 10</codered></li>
    <li><codered>-10 ≤ target ≤ 10</codered></li>
  </ul>`
  }

  return (
    <Split className='split' minSize={0}>
      <ProblemDescription problem={problem} _solved={solved}/>
      <div className='bg-dark-fill-2'>
        <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved}/>
        {success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1}/>}
      </div>
    </Split>
  );
};
export default Workspace;
