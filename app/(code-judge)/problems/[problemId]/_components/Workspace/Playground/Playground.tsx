"use client"

import React, { useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { Problem } from "@/utils/types/problem";
import useLocalStorage from "@/hooks/useLocalStorage";
import { TestTube2 } from 'lucide-react';
import { problems } from "@/utils/problems";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  // const [userCode, setUserCode] = useState<string>(
  //   problem.title.padEnd(problem.title.length + 25, '\n')
  // );
  let [userCode, setUserCode] = useState<string>(problem.starterCode);

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const handleSubmit = async () => {
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const handler = problems[problem.id as string].handlerFunction;

      if (typeof handler === "function") {
        const success = handler(cb);
        if (success) {
          toast.success("Congrats! All tests passed!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);

          setSolved(true);
        }
      }
    } catch (error: any) {
      console.log(error.message);
      if (
        error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
      ) {
        const lines = error.message.split('\n');
        let actual, expected;

        for (const line of lines) {
          if (line.startsWith('+ ') && !line.includes('actual')) {
            actual = line.substring(2);
          }
          if (line.startsWith('- ') && !line.includes('expected')) {
            expected = line.substring(2);
          }
        }

        toast.error(`Got: ${actual}; Expected: ${expected}`, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };


  useEffect(() => {
    const code = localStorage.getItem(`code-${problem.id}`);
    setUserCode(code ? JSON.parse(code) : problem.starterCode);

  }, [problem.id, problem.starterCode]);

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${problem.id}`, JSON.stringify(value));
  };

  return (
    <div className='flex flex-col bg-light-layer-1 relative overflow-x-hidden'>
      <ToastContainer />

      <PreferenceNav handleSubmit={handleSubmit} settings={settings} setSettings={setSettings}/>
      <Split className='mt-[4px] h-[calc(100vh)]' direction='vertical' sizes={[40, 60]} minSize={60}>
        <div className='w-full overflow-auto'>
          <CodeMirror
            value={userCode}
            theme={vscodeLight}
            onChange={onChange}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
          />
        </div>
        <div className='w-full px-5 overflow-auto'>
          {/* testcase heading */}
          <div className='flex h-10 items-center space-x-6'>
            <div className='relative flex h-full flex-col justify-center cursor-pointer'>
              <div className='flex items-center'>
                <div className='text-sm font-medium leading-5 text-black'>Тест-Кейсы</div>
                <TestTube2 className='h-4 w-4 text-green-500 ml-2'/>
              </div>
              <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black'/>
            </div>
          </div>

          <div className='flex'>
          {problem.examples.map((example, index) => (
              <div
                className='mr-2 items-start mt-2 '
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className='flex flex-wrap items-center gap-y-4'>
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-light-fill-2 hover:bg-light-fill-3 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-black" : "text-gray-500"}
									`}
                  >
                    ТК {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='font-semibold my-4'>
            <p className='text-sm font-medium mt-4 text-black'>Ввод:</p>
            <div
              className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-light-fill-2 border-transparent text-black mt-2'>
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className='text-sm font-medium mt-4 text-black'>Вывод:</p>
            <div
              className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-light-fill-2 border-transparent text-black mt-2'>
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
    </div>
  );
};
export default Playground;