"use client";

import { track } from "@vercel/analytics";
import { useState } from "react";

export function KaomojiWave() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleMouseEnter = () => { setHovered(true); track("kaomoji_interacted"); };
  const handleMouseLeave = () => { setHovered(false); setClicked(false); };
  const handleClick = () => { setClicked(true); track("kaomoji_interacted"); };

  const face = clicked ? "(˙o˙\")" : hovered ? "(ᵔ̀oᵔ́ )" : "(•̀ᴗ•́ )";

  return (
    <>
      <style>{`
        @keyframes robo-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .robo-arm {
          animation: robo-bounce 0.35s steps(2, end) infinite;
        }
      `}</style>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`transition-colors ${hovered ? "text-orange-500 dark:text-orange-400" : ""}`}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        {face}
        <span className={hovered && !clicked ? "inline-block robo-arm" : "inline-block"}>و</span>
      </span>
    </>
  );
}
