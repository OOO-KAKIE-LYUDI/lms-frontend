"use client"

import { DBProblem, Problem } from "@/utils/types/problem";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import RectangleSkeleton from "@/app/(code-judge)/problems/[problemId]/_components/Skeletons/RectangleSkeleton";
import CircleSkeleton from "@/app/(code-judge)/problems/[problemId]/_components/Skeletons/CircleSkeleton";
import { ChevronDownIcon } from 'lucide-react';

type ProblemDescriptionProps = {
  problem: Problem;
  _solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
  const { user } = useUser();
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetCurrentProblem(problem.id);
  const { liked, disliked, solved, setData, starred } = useGetUsersDataOnProblem(problem.id);

  const tabs = [
    { id: 'description', label: 'Описание 📝' },
    { id: 'hints', label: 'Подсказки 💡' },
    { id: 'video', label: 'Видео Решение 🎬' }
  ];

  // Mock data for the DB problem
  const mockDBProblem: DBProblem = {
    id: "two-sum",
    title: "Two Sum",
    category: "Arrays",
    difficulty: "Easy",
    likes: 15420,
    dislikes: 547,
    order: 1,
    videoId: "abcd1234",
    link: "https://leetcode.com/problems/two-sum"
  };

  const returnUserDataAndProblemData = async (action: 'like' | 'dislike' | 'star') => {
    switch (action) {
      case 'like':
        return {
          userData: {
            liked: !liked,
            disliked,
            starred,
            solved
          },
          problem: {
            ...mockDBProblem,
            likes: liked ? mockDBProblem.likes - 1 : mockDBProblem.likes + 1
          }
        };
      case 'dislike':
        return {
          userData: {
            liked,
            disliked: !disliked,
            starred,
            solved
          },
          problem: {
            ...mockDBProblem,
            dislikes: disliked ? mockDBProblem.dislikes - 1 : mockDBProblem.dislikes + 1
          }
        };
      case 'star':
        return {
          userData: {
            liked,
            disliked,
            starred: !starred,
            solved
          },
          problem: mockDBProblem
        };
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like the problem");
      return;
    }
    setUpdating(true);
    try {
      const { userData, problem } = await returnUserDataAndProblemData('like');
      setData(userData);
      setCurrentProblem(problem);
      toast.success("Successfully liked the problem!");
    } catch (error) {
      toast.error("Error liking the problem");
    } finally {
      setUpdating(false);
    }
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("Please login to dislike the problem");
      return;
    }
    setUpdating(true);
    try {
      const { userData, problem } = await returnUserDataAndProblemData('dislike');
      setData(userData);
      setCurrentProblem(problem);
      toast.success("Successfully disliked the problem!");
    } catch (error) {
      toast.error("Error disliking the problem");
    } finally {
      setUpdating(false);
    }
  };

  const handleStar = async () => {
    if (!user) {
      toast.error("Please login to star the problem");
      return;
    }
    setUpdating(true);
    try {
      const { userData } = await returnUserDataAndProblemData('star');
      setData(userData);
      toast.success("Successfully starred the problem!");
    } catch (error) {
      toast.error("Error starring the problem");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className='bg-white'>
      {/* Tabs Navigation */}
      <div className='bg-zinc-100 flex w-full items-center pt-2 text-gray-900 font-semibold overflow-x-hidden'>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-[10px] text-sm cursor-pointer rounded-t-[5px] ${activeTab === tab.id
              ? 'bg-white' // Changed from bg-zinc-100 to bg-gray-200 for darker active tab
              : tab.id === 'hints'
                ? 'bg-zinc-100'
                : tab.id === 'video'
                  ? 'bg-zinc-100' // Changed from bg-gray-200 to bg-zinc-100 for lighter inactive tabs
                  : 'bg-zinc-100'
            }
  `}
          >
            {tab.label}
          </div>

        ))}
      </div>

      {/* Tab Content */}
      <div className='px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
        {activeTab === 'description' && (
          <div className='px-5'>
            <div className='w-full'>
              <div className='flex space-x-4'>
                <div className='flex-1 mr-2 text-lg text-gray-900 font-medium'>{problem.title}</div>
              </div>

              {!loading && currentProblem && (
                <div className='flex items-center py-3'>
                  <div
                    className={`${
                      currentProblem.difficulty === 'Easy' ? 'bg-green-500 text-green-600' :
                        currentProblem.difficulty === 'Medium' ? 'bg-yellow-500 text-yellow-500' :
                          'bg-red-500 text-red-500'
                    } inline-block rounded-[21px] bg-opacity-[.15] py-2 px-3 text-xs font-medium capitalize`}>
                    {currentProblem.difficulty}
                  </div>

                  {(solved || _solved) && (
                    <div
                      className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-green-600'>
                      <BsCheck2Circle/>
                    </div>
                  )}

                  <div
                    className='flex items-center cursor-pointer hover:bg-gray-100 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-600'
                    onClick={handleLike}>
                    {liked && !updating && <AiFillLike className='text-green-600'/>}
                    {!liked && !updating && <AiFillLike/>}
                    {updating && <AiOutlineLoading3Quarters className='animate-spin'/>}
                    <span className='text-xs'>{currentProblem.likes}</span>
                  </div>

                  <div
                    className='flex items-center cursor-pointer hover:bg-gray-100 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-600'
                    onClick={handleDislike}>
                    {disliked && !updating && <AiFillDislike className='text-red-600'/>}
                    {!disliked && !updating && <AiFillDislike/>}
                    {updating && <AiOutlineLoading3Quarters className='animate-spin'/>}
                    <span className='text-xs'>{currentProblem.dislikes}</span>
                  </div>

                  <div
                    className='cursor-pointer hover:bg-gray-100 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-green-s text-gray-600'
                    onClick={handleStar}>
                    {starred && !updating && <AiFillStar className='text-yellow-500'/>}
                    {!starred && !updating && <TiStarOutline/>}
                    {updating && <AiOutlineLoading3Quarters className='animate-spin'/>}
                  </div>
                </div>
              )}

              {loading && (
                <div className='mt-3 flex space-x-2'>
                  <RectangleSkeleton/>
                  <CircleSkeleton/>
                  <RectangleSkeleton/>
                  <RectangleSkeleton/>
                  <CircleSkeleton/>
                </div>
              )}

              <div className='text-gray-900 text-sm leading-relaxed'>
                <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }}/>
              </div>

              <div className='mt-4'>
                {problem.examples.map((example, index) => (
                  <div key={example.id}>
                    <p className='font-medium text-gray-900'>Пример {index + 1}: </p>
                    {example.img && <img src={example.img} alt='' className='mt-3'/>}
                    <div className='example-card'>
                      <pre>
                        <strong className='text-gray-900'>Input: </strong> {example.inputText}
                        <br/>
                        <strong>Output:</strong> {example.outputText}
                        <br/>
                        {example.explanation && (
                          <>
                            <strong>Explanation:</strong> {example.explanation}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              <div className='text-gray-900 text-sm font-medium pb-4'>Ограничения:</div>
              <ul className='text-gray-900 list-disc pb-4'>
                <div dangerouslySetInnerHTML={{ __html: problem.constraints }}/>
              </ul>

            </div>
          </div>
        )}

        {activeTab === 'hints' && (
          <div className='px-5 space-y-4'>
            <div className='flex flex-col gap-3'>

              {/* Hint 1 */}
              <HintDropdown
                number={1}
                title="Заголовок подсказки 1"
                content="Подход подход еще подход"
              />

              {/* Hint 2 */}
              <HintDropdown
                number={2}
                title="Заголовок подсказки 2"
                content="Это содержание для подсказки 2. Добавьте свою полезную информацию здесь."
              />

              {/* Hint 3 */}
              <HintDropdown
                number={3}
                title="Заголовок подсказки 3"
                content="Это содержание для подсказки 3. Добавьте свою полезную информацию здесь."
              />
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className='px-5'>
            {/* Add your video solution content here */}
            <p>Задача база, так и быть, помогу</p>
            <div className="video-wrapper mt-4">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/5gd13Bh2oM4"
                title="Video Solution"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>({
    id: "two-sum",
    title: "Two Sum",
    category: "Arrays",
    difficulty: "Easy",
    likes: 15420,
    dislikes: 547,
    order: 1,
    videoId: "abcd1234",
    link: "https://leetcode.com/problems/two-sum"
  });
  const [loading, setLoading] = useState(true);
  const [problemDifficultyClass, setProblemDifficultyClass] = useState('text-olive');

  useEffect(() => {
    const getCurrentProblem = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: true
  });
  const { user } = useUser();

  useEffect(() => {
    const getUsersDataOnProblem = async () => {
      setTimeout(() => {
        setData({
          liked: false,
          disliked: false,
          starred: false,
          solved: true
        });
      }, 1000);
    };

    if (user) getUsersDataOnProblem();
    return () => setData({ liked: false, disliked: false, starred: false, solved: false });
  }, [problemId, user]);

  return { ...data, setData };
}

type HintDropdownProps = {
  number: number;
  title: string;
  content: string;
};

// HintDropdown Component
const HintDropdown: React.FC<HintDropdownProps> = ({ number, title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=''>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between p-3 bg-zinc-100 border rounded-lg hover:bg-gray-100 transition-colors'
      >
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Подсказка {number}:</span>
          <span className='text-gray-700'>{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className='mt-2 p-3 bg-zinc-100 rounded-lg ml-4 text-gray-700'>
          {content}
        </div>
      )}
    </div>
  );
};

export default ProblemDescription;
