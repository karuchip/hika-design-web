"use client";

import { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = (scrollTop / height) * 100;

      setProgress(scrolled);
    };

    window.addEventListener("scroll", updateProgress);

    return() => window.removeEventListener("scroll", updateProgress);
  }, []);

  return(
    <div className="absolute bottom-0 left-0 w-full h-[3px]">
      <div
        className="h-full bg-[#6AACFB] transition-all"
        style={{width: `${progress}%`}}
      />
    </div>
  )
}

export default ReadingProgress;
