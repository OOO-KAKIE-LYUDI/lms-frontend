import React, { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { ISettings } from "../Playground";
import SettingsModal from "@/app/(code-judge)/problems/[problemId]/_components/Modals/SettingsModal";
import { Play, Send } from "lucide-react";

type PreferenceNavProps = {
  handleSubmit: () => void;
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({ handleSubmit, setSettings, settings }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='mt-[4px] flex items-center space-x-2'>
        <div className='hover:bg-zinc-200 flex items-center text-white bg-light-fill-2 rounded-lg px-2'>
          <select
            className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-black px-2 py-1.5 font-medium'>
            <option value='javascript'>JavaScript</option>
            <option value='python'>Python</option>
            <option value='java'>Java</option>
            <option value='cpp'>C++</option>
          </select>
        </div>
        <button
          className='px-2 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s  rounded-lg'
          onClick={handleSubmit}
        >
          Start
          <Play className="h-4 w-4 ml-1"/>
        </button>
      </div>

      <div className='flex items-center m-2'>
        <button
          className='preferenceBtn group'
          onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
        >
          <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
            <AiOutlineSetting/>
          </div>
          <div className='preferenceBtn-tooltip'>Настройки</div>
        </button>

        <button className='preferenceBtn group' onClick={handleFullScreen}>
          <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
            {!isFullScreen ? <AiOutlineFullscreen/> : <AiOutlineFullscreenExit/>}
          </div>
          <div className='preferenceBtn-tooltip'>Полный Экран</div>
        </button>
      </div>
      {settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings}/>}
    </div>
  );
};
export default PreferenceNav;
