"use client";

import { track } from "@vercel/analytics";
import { Nut } from "lucide-react";
import { useState } from "react";

const message = "Help! I'm trapped in a nutshell!";

export function NutshellNut() {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "default",
      }}
      onMouseEnter={() => { setHovered(true); track("nutshell_interacted"); }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => track("nutshell_interacted")}
    >
      {hovered && (
        <div
          className="font-sans"
          style={{
            position: "absolute",
            bottom: "105%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "hsl(var(--foreground))",
            color: "hsl(var(--background))",
            borderRadius: "1rem",
            padding: "0.35rem 0.65rem",
            fontSize: "0.7rem",
            fontWeight: 400,
            maxWidth: "min(14rem, 90vw)",
            textAlign: "center",
            lineHeight: 1.35,
            zIndex: 1,
            letterSpacing: "0.01rem",
          }}
        >
          {message}
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "6px solid hsl(var(--foreground))",
            }}
          />
        </div>
      )}

      <Nut
        className="h-3.5 w-3.5 shrink-0"
        aria-hidden
        style={{
          display: "block",
          transition: "transform 0.18s ease, color 0.18s ease",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          color: hovered ? "hsl(var(--accent))" : "hsl(var(--foreground))",
        }}
      />
    </span>
  );
}
