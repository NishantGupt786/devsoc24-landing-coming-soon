"use client";
import React, { useEffect, useState } from "react";

interface TypewriterEffectProps {
  textLines: string[];
  onTypingComplete?: () => void;
}

const TypewriterEffect = ({
  textLines,
  onTypingComplete,
}: TypewriterEffectProps) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<(string | undefined)[]>(
    [],
  );

  useEffect(() => {
    if (lineIndex < textLines.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedLines((prevLines) => [...prevLines, textLines[lineIndex]]);
        setLineIndex(lineIndex + 1);
      }, lineIndex * 10);

      return () => clearTimeout(timeoutId);
    } else {
      setTimeout(() => {
        if (onTypingComplete) {
          onTypingComplete();
        }
      }, 600);
    }
  }, [lineIndex, textLines, onTypingComplete]);

  return (
    <div className="font-diatype text-sm font-thin text-[#757575]">
      {displayedLines.map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line ?? "" }} />
      ))}
    </div>
  );
};

export default TypewriterEffect;
