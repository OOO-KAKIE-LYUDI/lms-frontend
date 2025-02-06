"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/app/(code-judge)/problems/[problemId]/_components/Topbar/Topbar";
import { Problem } from "@/utils/types/problem";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { twoSum } from "@/utils/problems/two-sum";
import { reverseLinkedList } from "@/utils/problems/reverse-linked-list";
import { jumpGame } from "@/utils/problems/jump-game";
import { search2DMatrix } from "@/utils/problems/search-a-2d-matrix";
import { validParentheses } from "@/utils/problems/valid-parentheses";
import { Card } from "@/components/ui/card";
import {BsCheck2Circle} from "react-icons/bs";

const mockedProblems: Problem[] = [twoSum, reverseLinkedList, jumpGame, search2DMatrix, validParentheses];

const ProblemListPage: React.FC = () => {
    const router = useRouter();

    const onClick = (problemId: string) => {
        console.log(`Navigating to: /problems/${problemId}`);
        router.push(`/problems/${problemId}`);
    };

    return (
        <div style={{ height: "100vh", overflow: "hidden", width: "100%" }}>
            <Topbar problemPage={false} />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Problem List</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Название</TableHead>
                            <TableHead>Решено</TableHead>
                            <TableHead className={`flex items-center justify-center`}>Сложность</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockedProblems.map((problem, index) => (
                            <TableRow key={problem.id}
                                      className="cursor-pointer hover:bg-gray-100"
                                      onClick={() => onClick(problem.id)}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    {problem.title}
                                </TableCell>
                                <TableCell>
                                    {(problem.solved) && (
                                        <div
                                            className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-green-600'>
                                            <BsCheck2Circle/>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className={`flex items-center justify-center`}>
                                    <div
                                        className={`inline-block rounded-[21px] bg-opacity-[.15] py-2 px-3 text-xs font-medium capitalize ${problem.difficulty.color}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {problem.difficulty.name}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ProblemListPage;