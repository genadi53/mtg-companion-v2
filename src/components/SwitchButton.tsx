"use client";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { cn } from "~/utils/cn";

interface SwitchButtonProps {
  size?: number;
  onClick: (e: React.MouseEvent) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ size, onClick }) => {
  const { theme } = useTheme();

  const [color, setColor] = useState<string>(
    theme === "light" ? "#000" : "#fff"
  );

  return (
    <button
      // className="rounded-3xl border-2 border-[#343242] p-2 text-black opacity-60"
      // style={{
      //   width: size,
      //   height: size,
      //   backgroundColor: backgroung,
      //   transition: "background-color 200ms linear, opacity 50ms linear",
      // }}
      type="button"
      title="Turn Over"
      className={cn(
        "h-11 w-11 cursor-pointer rounded-[100%] border-2 border-[#343242] bg-white p-2 text-black opacity-60",
        "relative left-[72.5%] top-[37.25%] z-10"
      )}
      // class="card-grid-item-transform-button"
      onClick={(e) => {
        onClick(e);
      }}
    >
      <svg
        focusable="false"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
      >
        <path
          fill={color}
          d="M884.3,357.6c116.8,117.7,151.7,277-362.2,320V496.4L243.2,763.8L522,1031.3V860.8C828.8,839.4,1244.9,604.5,884.3,357.6z"
        ></path>
        <path
          fill={color}
          d="M557.8,288.2v138.4l230.8-213.4L557.8,0v142.8c-309.2,15.6-792.1,253.6-426.5,503.8C13.6,527.9,30,330.1,557.8,288.2z"
        ></path>
      </svg>
    </button>
  );
};

export default SwitchButton;
