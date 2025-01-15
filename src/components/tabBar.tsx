// https://tailwindcomponents.com/component/radio-buttons-1
"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TabBarProps {
  currentTab?: number;
  tabOption: number[];
}

export const TabBar = ({
  tabOption = [1, 2, 3, 4],
  currentTab = 1,
}: TabBarProps) => {
  const tabOptionTotal = tabOption.length;

  const router = useRouter();
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
    router.refresh();
  };

  return (
    <div
      className={`
        ${"grid-cols-" + tabOptionTotal} 
        grid w-full space-x-2 rounded-xl bg-gray-200 p-2
      `}
    >
      {tabOption.map((tab) => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            htmlFor={tab.toString()}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
