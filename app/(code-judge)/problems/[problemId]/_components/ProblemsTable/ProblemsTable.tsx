"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckCircle, Youtube } from "lucide-react"
import type { DBProblem } from "@/utils/types/problem"
import YouTube from "react-youtube"
import type React from "react" // Import React

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
}

export function ProblemsTable({ setLoadingProblems }: ProblemsTableProps) {

  const [problems, setProblems] = useState<DBProblem[]>([])

  useEffect(() => {
    const fetchProblems = async () => {
      setLoadingProblems(true)
      try {
        const response = await fetch("http://localhost:8088/api/algo/problems")
        const data = await response.json()
        setProblems(data)
        console.log(data)

      } catch (error) {
        console.error("Failed to fetch problems:", error)
      } finally {
        setLoadingProblems(false)
      }
    }

    fetchProblems()
  }, [setLoadingProblems])


  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Solved</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[100px]">Solution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell>
                <CheckCircle className="h-5 w-5 text-green-500"/>
              </TableCell>
              <TableCell>
                {problem.link ? (
                  <Link href={problem.link} className="hover:underline" target="_blank">
                    {problem.title}
                  </Link>
                ) : (
                  <Link href={`/problems/${problem.id}`} className="hover:underline">
                    {problem.title}
                  </Link>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
              </TableCell>
              <TableCell>{problem.category}</TableCell>
              <TableCell>
                {problem.videoId ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Youtube className="h-4 w-4 text-red-500"/>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Video Solution</DialogTitle>
                      </DialogHeader>
                      <div className="aspect-video">
                        <YouTube
                          videoId={problem.videoId}
                          opts={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <span className="text-gray-400">Coming soon</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
  const [problems, setProblems] = useState<DBProblem[]>([
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      link: "",
      videoId: "dQw4w9WgXcQ",
      likes: 100,
      dislikes: 10,
      order: 1,
    },
    {
      id: "2",
      title: "Add Two Numbers",
      difficulty: "Medium",
      category: "Linked List",
      link: "",
      videoId: "",
      likes: 200,
      dislikes: 20,
      order: 2,
    },
    {
      id: "3",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Hard",
      category: "String",
      link: "",
      videoId: "dQw4w9WgXcQ",
      likes: 300,
      dislikes: 30,
      order: 3,
    },
  ])

  return problems
}

